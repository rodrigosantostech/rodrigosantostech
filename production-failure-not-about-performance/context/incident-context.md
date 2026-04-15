# Incident Context

## Cenario

Fluxo de checkout com dependencia externa de pagamento e confirmacao assincrona por fila.

## Pressao operacional

- SLO de disponibilidade alto.
- Dependencia externa sem controle direto de capacidade.
- Time sob demanda de recuperacao imediata sem afetar conciliacao financeira.

## Hipotese principal

Falha em cascata causada por retries em camadas (cliente e servico), resultando em amplificacao de carga e saturacao da fila.
