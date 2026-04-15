---
title: "IA não é root cause engine: guardrails para triagem técnica em C#/.NET"
description: Como usar LLMs para classificar incidentes e resumir evidências sem terceirizar diagnóstico nem abrir espaço para alucinação operacional.
pubDate: 2026-04-15
tags:
  - dotnet
  - ia
  - reliability
  - observability
  - arquitetura
---

## Contexto

Todo time que opera serviços .NET em produção conhece a cena: um incidente começa, o volume de alertas sobe e, antes de qualquer correção útil, o canal já está cheio de prints, hipóteses e ruído. O custo não está só na falha. Está no tempo até a primeira leitura operacional confiável.

Foi nesse ponto que a ideia de usar IA apareceu. Não para descobrir a verdade do incidente, mas para condensar sinais repetidos, sugerir uma categoria inicial e reduzir o tempo entre o primeiro alerta e a primeira hipótese utilizável.

## O problema real

O desenho ingênuo parecia tentador: entregar logs e métricas para o modelo e pedir causa raiz, prioridade e próximo passo. O problema é que texto fluido não equivale a evidência. Em engenharia de produção, uma hipótese bem escrita continua sendo um risco se não houver rastreabilidade.

Sem guarda de qualidade, o sistema ganha três modos de falha novos:

1. Classificar o componente errado com confiança alta.
2. Resumir sintoma como se fosse causa raiz.
3. Induzir ação operacional com base em evidência incompleta.

Nesse cenário, a IA não reduz incerteza. Ela só dá velocidade para uma incerteza mal enquadrada.

## A decisão de arquitetura

A decisão correta foi limitar o papel da IA. Em vez de colocar o modelo como analista autônomo, passamos a tratá-lo como classificador assistivo dentro de um pipeline governado.

O fluxo ficou assim:

- o coletor consolida um pacote de evidências com alertas, traces, erros dominantes e mudanças recentes;
- a chamada ao modelo recebe apenas esse pacote estruturado;
- a resposta precisa obedecer a um schema fechado;
- o resultado só segue adiante se citar evidências que realmente existem no pacote;
- toda resposta abaixo do limiar de confiança vai para revisão humana.

Isso trouxe um ponto importante: o guardrail principal não mora no prompt. Mora na arquitetura ao redor do modelo.

| Guardrail | Falha evitada | Custo introduzido |
| --- | --- | --- |
| Schema fechado de saída | Resposta ambígua ou impossível de validar | Mais trabalho de manutenção do contrato |
| Evidence IDs obrigatórios | Alucinação sem lastro observável | Necessidade de montar um pacote de evidências melhor |
| Confidence gate | Automação precipitada | Mais casos caindo para revisão humana |
| Categorias em whitelist | Taxonomia inconsistente ou componente inventado | Menor flexibilidade para novos cenários |

## Implementação em C#/.NET

No pipeline em C#/.NET, a resposta do modelo foi tratada como um objeto restrito, não como texto livre confiável por padrão.

```csharp
public sealed record TriageSuggestion(
    string Category,
    string SuspectedComponent,
    double Confidence,
    string[] EvidenceIds,
    string Recommendation);

var suggestion = await _triageClient.ClassifyAsync(packet, ct);

var hasTraceableEvidence = suggestion.EvidenceIds.Length > 0 &&
    suggestion.EvidenceIds.All(id => packet.Evidences.Any(e => e.Id == id));

var isAllowedCategory = AllowedCategories.Contains(suggestion.Category);
var canAutoTag = hasTraceableEvidence &&
    isAllowedCategory &&
    suggestion.Confidence >= 0.78;

if (!canAutoTag)
    return ManualReview.Required("Resposta sem lastro suficiente para automação parcial.");

return AutoTag.Apply(suggestion.Category, suggestion.SuspectedComponent);
```

O snippet não resolve o incidente. Ele só protege a borda entre apoio inteligente e ação operacional.

## Resultado esperado/medido

Depois do rollout controlado, o ganho apareceu onde precisava aparecer:

- menos tempo até a primeira hipótese operacional útil;
- menos ruído manual para agrupar alertas repetidos;
- zero dependência de texto livre para automação de ação crítica.

O benefício real não veio de acertar tudo. Veio de errar de forma contida. Quando o modelo não tinha base suficiente, o sistema caía para revisão humana sem contaminar o fluxo com confiança fabricada.

## Checklist de aplicação

1. Separe triagem assistida de diagnóstico definitivo.
2. Envie para o modelo apenas um pacote de evidências estruturado.
3. Restrinja a saída a categorias e campos previamente validados.
4. Exija referência a evidências reais antes de aceitar qualquer classificação.
5. Defina confidence gate para automação parcial e fallback humano abaixo do limiar.
6. Nunca deixe mitigação automática depender de texto livre do modelo.

## Conclusão

IA aplicada à engenharia de software não fica madura quando escreve melhor. Fica madura quando opera com fronteira clara de responsabilidade.

Em produção, o papel certo da IA não é declarar causa raiz. É encurtar o caminho entre sinais brutos e hipótese verificável, sem ultrapassar o limite em que só observabilidade, contexto e julgamento técnico podem decidir.

## Referências técnicas

- [Microsoft Learn - Structured outputs](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs?tabs=python-secure%2Cdotnet-entra-id&pivots=programming-language-csharp): sustenta o uso de schema fechado, `additionalProperties: false` e campos obrigatórios para reduzir ambiguidade quando a IA participa de automações parciais.
- [Microsoft Learn - Content filtering for Microsoft Foundry Models](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/content-filter): reforça o uso de groundedness, prompt shields, output filters e a necessidade de checar `finish_reason` e erros de execução do filtro no desenho da aplicação.
- [Microsoft Learn - AI Workload Documentation](https://learn.microsoft.com/en-us/azure/well-architected/ai/): serve como trilha oficial para temas complementares do mesmo problema, como grounding data, testing and evaluation e responsible AI em workloads não determinísticos.
