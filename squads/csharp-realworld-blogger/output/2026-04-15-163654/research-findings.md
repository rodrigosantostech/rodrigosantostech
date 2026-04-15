# Research Findings

## Tema
Decisão de arquitetura para API crítica de pagamentos: cache seletivo + write-through defensivo + invalidação orientada a evento no .NET.

## Pergunta central
Como reduzir latência em endpoint crítico sem sacrificar consistência operacional e sem introduzir comportamento imprevisível em picos de carga?

## Contexto operacional
A API de autorização fazia validações custosas em cadeia (limites, antifraude, perfil do cliente, regras de produto). A latência p95 subia em horários de pico e o time considerou cache agressivo como solução imediata. Incidentes anteriores mostraram que cache mal aplicado causava autorização com política desatualizada.

## Hipótese técnica
Cache seletivo por tipo de dado, com TTL curto e invalidação por evento de domínio, reduz p95 sem abrir risco inaceitável de decisão com estado velho.

## Decisão de arquitetura recomendada
1. Separar dados em classes: estáticos de curta mutação, semidinâmicos e críticos de consistência forte.
2. Aplicar cache apenas na classe tolerante a eventual consistência.
3. Usar write-through para atualização de leitura frequente quando a origem mudar.
4. Invalidação orientada a evento com chave de versão para evitar stale read silenciosa.
5. Definir guard-rail: em dúvida de consistência, fallback para fonte primária.

## Trade-offs
- Menor latência versus custo operacional de invalidação e telemetria extra.
- Menor carga no banco versus risco de estado stale em janelas curtas.
- Mais previsibilidade em picos versus maior complexidade de observabilidade e debug.

## Riscos e limites
- Invalidação atrasada pode gerar autorização em regra antiga.
- Chaves de cache mal desenhadas ampliam colisão e efeito cruzado.
- Cache de dados críticos sem versionamento é bloqueador.

## Material para escrita
- Título sugerido: Quando cache ajuda o p95 e ameaça a consistência: decisão de arquitetura em API crítica no .NET
- Linha de argumentação: pressão por performance -> risco oculto -> decisão de desenho -> implementação segura -> resultado
- Pontos obrigatórios:
  - classes de dados e política de cache por classe
  - fallback defensivo para fonte primária
  - métricas de hit ratio, stale read e erro por versão
  - critérios para desligar cache rapidamente em incidente
