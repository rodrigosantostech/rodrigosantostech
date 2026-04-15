Tema: usar um log do CloudWatch para iniciar uma Lambda em .NET

Contexto de produção:
- API ASP.NET Core de autorização de pagamentos rodando em ECS/Fargate.
- Logs estruturados chegam ao CloudWatch Logs com correlationId, provider, tenant e tipo de falha.
- O time quer reduzir o tempo entre o primeiro erro relevante e a abertura de uma investigação acionável.

Problema principal:
- Alarmes por métrica estão chegando tarde para falhas intermitentes de integração.
- Ler logs manualmente aumenta MTTR e abre espaço para hipótese errada.

Métrica que queremos melhorar:
- Tempo até a primeira hipótese operacional útil.
- MTTR em incidentes de indisponibilidade parcial do provedor externo.

Recorte do post:
- Pesquisar e explicar quando faz sentido usar CloudWatch Logs Subscription Filter para acionar uma Lambda em C#/.NET.
- Criar um cenário fictício, mas plausível, em produção.
- Explicitar riscos, trade-offs e guarda de qualidade para não transformar log em automação reativa demais.