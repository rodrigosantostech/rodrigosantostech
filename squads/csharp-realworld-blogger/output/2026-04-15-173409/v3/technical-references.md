# Technical References

## Referências prioritárias

### Referência 1
- Fonte: AWS CloudWatch Logs Documentation - Log group-level subscription filters
- URL: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
- O que sustenta: subscription filters podem encaminhar eventos de log para AWS Lambda e o payload chega comprimido em gzip e codificado em base64.
- Como usar no post: justificar a decisão de tratar a Lambda como borda de parsing, enriquecimento e deduplicação, não como simples consumidor de string.
- Limite: a página explica mecânica e destinos suportados, mas não define sozinha o desenho de governança operacional.

### Referência 2
- Fonte: AWS Lambda Developer Guide - Define Lambda function handler in C#
- URL: https://docs.aws.amazon.com/lambda/latest/dg/csharp-handler.html
- O que sustenta: handlers em C#/.NET, convenções de serialização, uso do contexto da Lambda e boas práticas para funções no runtime .NET.
- Como usar no post: sustentar o trecho de implementação em C#/.NET e a responsabilidade da função como processadora de eventos.
- Limite: não cobre estratégia de detecção por log nem política de threshold por domínio.

### Referência 3
- Fonte: AWS Lambda Developer Guide - Using Lambda with CloudWatch Logs
- URL: https://docs.aws.amazon.com/lambda/latest/dg/with-cloudwatch-logs.html
- O que sustenta: a integração oficial entre CloudWatch Logs e Lambda como fonte de eventos.
- Como usar no post: reforçar que o padrão é suportado pela plataforma e não uma gambiarra operacional.
- Limite: a utilidade prática depende de filtro seletivo e modelagem do evento na aplicação.

### Referência 4
- Fonte: Microsoft Learn - Logging in C# and .NET
- URL: https://learn.microsoft.com/en-us/dotnet/core/extensions/logging
- O que sustenta: o ecossistema .NET oferece logging estruturado e de alta performance via ILogger para observabilidade e diagnóstico.
- Como usar no post: justificar que o desenho depende de logs estruturados e campos consistentes emitidos pela aplicação ASP.NET Core.
- Limite: a documentação é de logging geral; não dita o recorte operacional específico de CloudWatch + Lambda.

## Observações para escrita
- O argumento central deve separar claramente sinal operacional de causa raiz.
- Vale enfatizar que a qualidade do schema do log é tão importante quanto o código da Lambda.
- O post precisa mostrar por que a alternativa "acionar em qualquer ERROR" é ruim em produção.
- O exemplo em C#/.NET deve mostrar idempotência e threshold, não só parsing do evento.