---
title: O dia em que performance não era o problema — e mesmo assim o sistema caía
description: Quando o gargalo não estava em CPU, memória ou query lenta, mas no comportamento emergente entre serviços.
pubDate: 2026-04-15
tags:
  - reliability
  - arquitetura
  - postmortem
---

## Contexto

Era uma terça-feira com tráfego previsível, nenhuma campanha ativa e métricas de infraestrutura dentro do esperado. CPU abaixo de 50%, latência média estável e banco sem sinais de contenção. Ainda assim, o checkout começou a degradar até ficar indisponível.

A arquitetura seguia um padrão comum: API de borda, serviço de pedidos, serviço de pagamento e fila para eventos de confirmação. Em teoria, era um fluxo resiliente. Na prática, um detalhe de integração criou uma falha em cascata.

## O falso problema

A primeira reação foi culpar performance. O raciocínio parecia lógico: timeout no checkout, fila crescendo, erro 5xx aumentando. O time abriu dashboards de query lenta, GC, uso de memória e saturação de CPU.

Nada explicava o colapso. Não havia recurso esgotado. O sistema não estava "lento" no sentido clássico; ele estava entrando em um ciclo de autoagressão.

## O problema real

O gateway de pagamento teve uma oscilação intermitente, retornando erro transitório para parte das transações. Nosso cliente HTTP aplicava retry automático com backoff curto, e o serviço de pedidos também tinha retry próprio ao detectar falhas de confirmação.

Isso criou retries em camadas. Uma chamada original virava múltiplas tentativas concorrentes, cada uma disparando logs, eventos e novas gravações de estado. Em poucos minutos:

- O pool de conexões da API de pedidos começou a disputar recursos com chamadas redundantes.
- A fila de confirmação passou a receber mensagens duplicadas em ritmo maior que a capacidade de consumo.
- O mecanismo de idempotência, correto em semântica, ficou caro em volume porque o banco precisou validar a mesma chave repetidas vezes.

Não era gargalo primário de performance. Era amplificação de carga induzida por estratégia de recuperação mal calibrada.

## A decisão difícil

Existiam duas opções imediatas: insistir no fluxo atual para tentar absorver o pico ou degradar funcionalidade conscientemente. Optamos pela segunda.

As ações de contenção foram:

- Desativar retries automáticos no cliente externo por feature flag.
- Reduzir tentativas no serviço de pedidos para uma única repetição com jitter real.
- Ativar circuit breaker para abrir rápido em janela de falhas.
- Colocar respostas de falha explícita para evitar que clientes repetissem chamadas sem controle.

Foi uma decisão desconfortável porque aumenta erro visível no curto prazo. Mas troca erro caótico por erro governado.

## O resultado

Em cerca de 18 minutos, o volume total de chamadas caiu para um nível saudável. A fila deixou de crescer e voltou a drenar. O tempo de recuperação completo foi menor do que em incidentes anteriores, mesmo sem aumento de capacidade.

O principal indicador de melhora não foi latência. Foi taxa de tentativas por transação, que despencou quando removemos a realimentação de retries.

## O aprendizado

Resiliência não é sinônimo de "tentar mais vezes". Em sistemas distribuídos, retry é multiplicador de tráfego e precisa de orçamento explícito.

Passamos a adotar três regras objetivas:

1. Retry só em um nível da cadeia, nunca em camadas independentes.
2. Toda política de retry precisa de limite global por operação.
3. Circuit breaker e idempotência devem ser pensados juntos, não como mecanismos isolados.

## Conclusão

Falhas graves nem sempre começam em falta de recurso. Muitas vezes elas nascem de decisões locais corretas que, combinadas, criam comportamento sistêmico destrutivo.

Naquele dia, a pergunta certa não era "o que está lento?", e sim "o que está se autoamplificando?". Quando mudamos a pergunta, a solução apareceu.

## Referências técnicas

- [Microsoft Learn - Retry pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry): reforça que retry deve ser usado para falhas transitórias, com política calibrada, e alerta que retries agressivos podem degradar ainda mais um serviço sobrecarregado.
- [Microsoft Learn - Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker): sustenta a separação entre retry e circuit breaker e o papel do breaker em evitar falha em cascata e degradação por dependência lenta ou indisponível.
- [Microsoft Learn - Implement HTTP call retries with exponential backoff with IHttpClientFactory and Polly policies](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-http-call-retries-exponential-backoff-polly): traz a recomendação prática de jitter em .NET para evitar picos sincronizados de retentativa durante indisponibilidade parcial.
