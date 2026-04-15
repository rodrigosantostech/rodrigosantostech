---
title: Quando cache melhora o p95 e ameaça a consistência: decisão de arquitetura no .NET
description: Como desenhamos cache seletivo em uma API crítica de pagamentos para reduzir latência sem transformar consistência em aposta.
pubDate: 2026-04-15
tags:
  - dotnet
  - arquitetura
  - api
  - reliability
  - performance
---

## Contexto

A pressão era objetiva: reduzir o p95 de uma API crítica de autorização de pagamentos sem piorar disponibilidade nem segurança transacional. O endpoint fazia uma sequência de validações de negócio e integrava múltiplas fontes. Em pico, a latência estourava orçamento.

A resposta intuitiva surgiu rápido: colocar cache em tudo. A resposta correta demorou mais: decidir onde cachear sem quebrar consistência.

## O problema real

Nos testes iniciais, cache agressivo derrubou latência, mas abriu um risco oculto: decisões de autorização com regra desatualizada. Em pagamentos, esse tipo de erro custa mais do que alguns milissegundos a mais.

A pergunta deixou de ser "como ganhar velocidade?" e virou "como ganhar velocidade sem perder correção?".

## A decisão de arquitetura

Definimos três classes de dados:

1. Baixa volatilidade: parâmetros raramente alterados, candidatos a cache com TTL curto.
2. Média volatilidade: regras que mudam ao longo do dia, cache com invalidação orientada a evento.
3. Alta criticidade de consistência: dados que não podem ser avaliados com stale read; sempre fonte primária.

Com isso, a arquitetura ficou:

- cache seletivo por classe de dado;
- invalidação por evento com versionamento de chave;
- fallback para fonte primária em divergência de versão;
- feature flag para desligar cache por domínio em incidente.

## Implementação em C#/.NET

No ASP.NET Core, o fluxo foi encapsulado por política:

- leitura com IMemoryCache/Redis só para domínios permitidos;
- chave com tenant + regra + versão;
- invalidação disparada por evento de atualização de regra;
- short-circuit para reconsulta direta quando houver mismatch de versão.

Exemplo simplificado:

```csharp
var cacheKey = $"rule:{tenantId}:{ruleId}:v{version}";
if (_cache.TryGetValue<RuleSnapshot>(cacheKey, out var snapshot))
    return snapshot;

var fresh = await _ruleRepository.GetSnapshotAsync(ruleId, ct);
_cache.Set(cacheKey, fresh, TimeSpan.FromSeconds(30));
return fresh;
```

O ponto principal não é o snippet. É o contrato de consistência por tipo de dado.

## Resultado medido

Após rollout progressivo:

- redução relevante de p95 em horários de maior concorrência;
- queda de carga na camada de leitura primária;
- estabilidade da taxa de autorização correta, sem aumento de inconsistência detectada.

O ganho real veio da governança da decisão, não do cache isolado.

## Checklist de aplicação

1. Classifique dados por volatilidade e criticidade antes de ligar cache.
2. Defina versão de regra na chave para invalidar com segurança.
3. Meça hit ratio junto com stale read rate, nunca isoladamente.
4. Tenha fallback explícito para fonte primária em suspeita de inconsistência.
5. Prepare kill switch por feature flag para incidentes.
6. Documente quando não usar cache.

## Conclusão

Cache pode ser acelerador ou amplificador de erro. Em API crítica, a decisão arquitetural madura não é "cachear mais", e sim "cachear com contrato de consistência".

Performance sem governança de estado vira risco operacional com aparência de otimização.
