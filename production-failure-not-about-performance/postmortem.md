# Postmortem - Failure Not About Performance

## Summary

A indisponibilidade foi causada por amplificacao de tentativas em cadeia apos degradacao intermitente do provedor de pagamento.

## What happened

- O provedor externo retornou erros transitorios.
- O servico de pedidos aplicou retry.
- O cliente HTTP tambem aplicou retry em paralelo.
- A fila de confirmacao recebeu eventos duplicados acima da capacidade.

## Why this was not a raw performance issue

CPU, memoria e latencia de banco estavam estaveis no inicio do incidente. O colapso veio de comportamento emergente: cada falha gerava mais carga que retroalimentava o sistema.

## Immediate mitigation

- Retry automatico removido por feature flag.
- Limite de tentativas reduzido.
- Circuit breaker habilitado para abrir rapido.

## Long-term actions

- Definir retry budget por operacao.
- Garantir retry em apenas um nivel da cadeia.
- Revisar idempotencia com foco em custo sob alta duplicidade.
