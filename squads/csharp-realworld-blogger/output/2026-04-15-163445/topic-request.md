Tema escolhido: Decisão de arquitetura para eliminar inconsistência entre banco e broker com Outbox + Idempotência em C#/.NET, incluindo uso de IA para triagem de eventos órfãos.

Contexto de produção:
- API de pedidos com alta taxa de escrita.
- Publicação de eventos para integração entre serviços.
- Incidentes intermitentes de divergência entre estado do pedido no banco e eventos efetivamente consumidos.

Métrica alvo:
- Reduzir taxa de inconsistência pedido/evento.
- Reduzir tempo de investigação de falhas de integração.
