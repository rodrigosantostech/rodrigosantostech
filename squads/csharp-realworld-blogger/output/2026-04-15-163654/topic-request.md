Tema escolhido: Decisão arquitetural em API crítica para reduzir latência sem quebrar consistência em C#/.NET.

Contexto de produção:
- API de autorização de pagamento com SLA rigoroso e alto throughput.
- Pressão para reduzir p95 mantendo taxa de aprovação e segurança transacional.

Métrica alvo:
- p95 de latência de autorização.
- Taxa de erro 5xx.
- Reprocessamento indevido por inconsistência de estado.
