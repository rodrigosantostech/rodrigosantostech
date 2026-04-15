# Research Findings

## Tema
Outbox + idempotência em .NET para evitar inconsistência entre transação de banco e publicação de evento.

## Pergunta central
Como reduzir falhas de consistência entre persistência de pedidos e mensageria sem sacrificar throughput ou ampliar complexidade operacional além do necessário?

## Contexto operacional
Em fluxos de pedidos com integração assíncrona, a aplicação grava no banco e publica evento para outros serviços. Em cenários de falha entre commit e envio ao broker, surgem pedidos persistidos sem evento correspondente. O efeito em cadeia inclui reconciliação manual, retrabalho de suporte e risco de processamento duplicado em retentativas.

## Hipótese técnica
Uma estratégia com tabela Outbox transacional + despachante assíncrono + consumo idempotente reduz inconsistência sistêmica e melhora rastreabilidade operacional.

## Decisão de arquitetura recomendada
1. Persistir pedido e registro Outbox na mesma transação local.
2. Desacoplar publicação do broker via worker dedicado.
3. Exigir chave de idempotência no consumidor.
4. Instrumentar pipeline com métricas de atraso de publicação e taxa de duplicidade.
5. Usar IA apenas para triagem e priorização de eventos órfãos, nunca para decidir confirmação de negócio.

## Trade-offs
- Consistência operacional maior versus aumento de complexidade de modelagem e observabilidade.
- Menos perda de eventos versus necessidade de tabela extra e política de retenção.
- Menor esforço de investigação manual versus custo de manter heurísticas de triagem assistida por IA.

## Riscos e limites
- Backlog do despachante pode crescer sem controle de concorrência e alertas.
- Idempotência mal desenhada pode mascarar erro lógico.
- IA pode classificar falso positivo em cenários atípicos; revisão humana continua obrigatória.

## Material para escrita
- Título sugerido: O dia em que o commit venceu o evento: como Outbox + idempotência estabilizaram integrações no .NET
- Linha de argumentação: problema real -> decisão arquitetural -> implementação prática -> resultado -> checklist
- Pontos obrigatórios:
  - diferença entre confiabilidade de entrega e consistência de negócio
  - política de retry com orçamento e jitter
  - observabilidade ponta a ponta (trace + métricas + DLQ)
  - limites do uso de IA em operações críticas
