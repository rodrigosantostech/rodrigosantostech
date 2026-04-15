# Notas de Arquitetura

## Fluxo simplificado

1. A API recebe o pedido de checkout.
2. O serviço de pedidos chama o provedor de pagamento.
3. A confirmação do pagamento publica um evento na fila.
4. Um consumidor atualiza o estado final do pedido.

## Modo de falha

Quando o provedor externo oscila, retries em camadas multiplicam tentativas para a mesma transação. Isso gera:

- competição por conexões;
- aumento de eventos duplicados;
- custo elevado de validação de idempotência.

## Decisão de engenharia

Trocar throughput bruto por estabilidade controlada:

- reduzir retries;
- aplicar circuit breaker;
- priorizar erro explícito sobre timeout indefinido.

## Leitura operacional

Este cenário mostra um ponto importante: nem toda degradação começa em CPU alta, memória saturada ou banco lento. Em sistemas distribuídos, o desenho de recuperação pode ser o amplificador principal do incidente.
