# Contexto do Incidente

## Cenário

Fluxo de checkout com dependência externa de pagamento e confirmação assíncrona por fila.

## Pressão operacional

- SLO de disponibilidade alto.
- Dependência externa sem controle direto de capacidade.
- Time sob demanda de recuperação imediata sem afetar conciliação financeira.

## Hipótese principal

Falha em cascata causada por retries em camadas, no cliente e no serviço, resultando em amplificação de carga e saturação da fila.
