---
title: "O dia em que o commit venceu o evento: Outbox e idempotência no .NET"
description: Como reduzimos inconsistência entre banco e mensageria com uma decisão arquitetural pragmática e suporte de IA para triagem operacional.
pubDate: 2026-04-15
tags:
  - dotnet
  - arquitetura
  - reliability
  - mensageria
  - ia
---

## Contexto

Em um fluxo de pedidos de alta escala, o estado no banco de dados e o evento no broker deveriam andar juntos. Na prática, em janelas de falha entre `commit` e publicação, surgiam pedidos confirmados sem evento correspondente. O resultado era conhecido: reconciliação manual, atraso em integrações e desgaste em incidentes repetitivos.

Não era um problema de CPU, nem de query lenta. Era um problema de consistência operacional.

## O problema real

O desenho inicial executava duas ações críticas em sequência:

1. Persistir o pedido no banco.
2. Publicar evento de domínio no broker.

Se algo falhasse no meio, ficávamos com estado parcial. Pior: retries em camadas podiam duplicar publicação ou mascarar ausência de evento, dependendo do ponto de quebra.

A dor não estava só na falha, mas no comportamento emergente:

- suporte sem rastreabilidade rápida do que faltou publicar;
- consumidores processando duplicidades em cenários de retentativa;
- investigação lenta por falta de correlação entre transação e entrega.

## A decisão de arquitetura

Adotamos três pilares:

1. **Outbox transacional**: pedido e evento persistidos na mesma transação local.
2. **Despachante assíncrono**: worker responsável por publicar registros pendentes no broker.
3. **Consumo idempotente**: cada consumidor valida uma chave única antes de aplicar efeitos.

Esse desenho não busca “consistência perfeita instantânea”. Ele troca sincronismo frágil por consistência eventual governada, com trilha auditável.

## Implementação em C#/.NET

A implementação prática ficou assim:

- API em ASP.NET Core grava `Order` e `OutboxMessage` no mesmo `SaveChanges`.
- `BackgroundService` varre outbox pendente em lotes com janela curta.
- Publicação no broker usa política de resiliência com orçamento de retries e jitter.
- Após `ack`, registro de outbox é marcado como publicado com timestamp.
- Consumidor persiste `ProcessedMessageId` para bloquear reprocessamento.

Trecho simplificado da ideia:

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);

var order = Order.Create(command.CustomerId, command.Total);
db.Orders.Add(order);

db.OutboxMessages.Add(OutboxMessage.From(
    aggregateId: order.Id,
    type: "OrderCreated",
    payload: JsonSerializer.Serialize(new { order.Id, order.Total })
));

await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
```

No worker, o foco foi evitar amplificação de carga:

- limite de concorrência por partição;
- timeout curto por tentativa;
- backoff com jitter real;
- DLQ com motivo explícito para análise.

## Onde a IA entrou (e onde não entrou)

Usamos IA para **triagem** de eventos órfãos:

- agrupar padrões de falha por assinatura de erro;
- sugerir prioridade por impacto potencial;
- indicar suspeita de regressão por mudança recente.

Não usamos IA para confirmar regra de negócio, reenfileirar automaticamente sem política, nem “decidir” reconciliação final. A decisão operacional continua humana com critérios objetivos.

## Resultado medido

Após estabilização do fluxo:

- queda consistente na taxa de inconsistência pedido/evento;
- redução do tempo médio de investigação por incidente de integração;
- menor volume de retrabalho manual em reconciliação.

O principal ganho foi previsibilidade: quando algo falha, agora sabemos **onde** falhou e **como** recuperar sem adivinhação.

## Checklist de aplicação

1. Grave entidade e outbox na mesma transação.
2. Defina chave de idempotência por mensagem no consumidor.
3. Monitore backlog da outbox e atraso de publicação.
4. Aplique retry com orçamento global, não em cascata.
5. Separe DLQ por tipo de erro para acelerar resposta.
6. Use IA como apoio de triagem, nunca como autoridade final.

## Conclusão

A maior mudança não foi tecnológica, foi de postura arquitetural. Saímos do “publicar e torcer” para um fluxo auditável, com recuperação explícita e risco controlado.

Em sistemas distribuídos, confiabilidade não nasce de mais tentativas. Nasce de decisões que tornam falhas visíveis, delimitadas e recuperáveis.
