# Architecture Notes

## Simplified flow

1. API recebe pedido de checkout.
2. Servico de pedidos chama provedor de pagamento.
3. Confirmacao do pagamento publica evento em fila.
4. Consumidor atualiza estado final do pedido.

## Failure mode

Quando o provedor externo oscila, retries em camadas multiplicam tentativas para a mesma transacao. Isso gera:

- competicao por conexoes,
- aumento de eventos duplicados,
- custo elevado de validacao de idempotencia.

## Engineering decision

Trocar throughput bruto por estabilidade controlada:

- reduzir retries,
- aplicar circuit breaker,
- priorizar erro explicito sobre timeout indefinido.
