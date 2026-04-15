# Research Findings

## Tema
Usar logs do CloudWatch para iniciar uma Lambda em .NET como etapa de triagem operacional em incidentes de integração.

## Pergunta central
Quando vale acionar uma Lambda em C#/.NET a partir de um log do CloudWatch, e quais guardrails evitam que isso vire uma cadeia ruidosa de automação baseada em sintoma?

## Contexto operacional
Em um fluxo de autorização de pagamentos, uma API ASP.NET Core publica logs estruturados no CloudWatch Logs sempre que o provedor externo responde com timeout, 429 ou erro transitório. Os alarmes por métrica capturam apenas o agregado alguns minutos depois, mas o impacto no checkout começa antes. O time precisa ganhar tempo de reação sem introduzir remediação automática em cima de qualquer linha de log.

## Hipótese técnica
Uma subscription filter do CloudWatch Logs pode enviar apenas eventos de alto sinal para uma Lambda em .NET, que atua como camada de triagem: enriquece o contexto, faz deduplicação, aplica threshold por janela curta e só então publica um evento operacional para investigação humana ou automação limitada.

## Decisão de arquitetura recomendada
Usar CloudWatch Logs -> Lambda .NET apenas como fronteira de ingestão e enriquecimento operacional, nunca como gatilho direto de correção em cima de um único log. O contrato deve depender de logs estruturados, filtro seletivo, idempotência e um buffer de decisão por janela curta antes de abrir incidente, marcar feature flag ou escalar o time.

## Trade-offs
- Menor latência para detectar falha relevante versus maior risco de ruído e custo por invocação em picos de erro.
- Flexibilidade de filtrar por conteúdo do log versus acoplamento ao schema e ao texto emitido pela aplicação.
- Reação mais rápida que dashboards manuais versus necessidade de deduplicação, threshold e trilha auditável.

## Riscos e limites
- Subscription filters entregam lotes comprimidos e codificados; parsing incorreto degrada o pipeline logo na borda.
- Drift no formato do log pode derrubar a seletividade do filtro ou gerar falso positivo.
- Em burst de erro, a Lambda pode amplificar ruído se não houver agregação por correlationId, provider e janela temporal.
- Log não deve virar autoridade final sobre causa raiz; ele é sinal de entrada para investigação.

## Material para escrita
- Título sugerido: Quando um log do CloudWatch deve acordar uma Lambda em .NET
- Linha de argumentação: reduzir MTTR sem terceirizar diagnóstico para automação reativa.
- Pontos obrigatórios:
  - cenário fictício com API ASP.NET Core e provedor externo instável;
  - por que métrica agregada chega tarde demais em alguns casos;
  - por que log bruto não pode disparar remediação direta;
  - uso de deduplicação e threshold em C#/.NET;
  - referências oficiais da AWS e do .NET para sustentar formato, handler e logging estruturado.