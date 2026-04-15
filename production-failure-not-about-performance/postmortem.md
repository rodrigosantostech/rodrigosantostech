# Postmortem - Failure Not About Performance

## Resumo

A indisponibilidade foi causada por amplificação de tentativas em cadeia após degradação intermitente do provedor de pagamento.

## O que aconteceu

- O provedor externo retornou erros transitórios.
- O serviço de pedidos aplicou retry.
- O cliente HTTP também aplicou retry em paralelo.
- A fila de confirmação recebeu eventos duplicados acima da capacidade.

## Por que isso não era um problema bruto de performance

CPU, memória e latência de banco estavam estáveis no início do incidente. O colapso veio de comportamento emergente: cada falha gerava mais carga, que retroalimentava o sistema.

Em outras palavras, o sistema não caiu por falta imediata de recurso. Ele caiu porque a estratégia de recuperação multiplicou o volume de trabalho enquanto a dependência externa continuava instável.

## Mitigação imediata

- Retry automático removido por feature flag.
- Limite de tentativas reduzido.
- Circuit breaker habilitado para abrir rápido.

## Ações de longo prazo

- Definir retry budget por operação.
- Garantir retry em apenas um nível da cadeia.
- Revisar idempotência com foco em custo sob alta duplicidade.
- Monitorar taxa de tentativas por transação como sinal operacional primário.
