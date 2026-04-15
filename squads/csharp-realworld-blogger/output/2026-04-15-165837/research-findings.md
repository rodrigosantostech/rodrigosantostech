# Research Findings

## Tema
Uso de IA para engenharia de software com guarda de qualidade em fluxos de triagem operacional com C#/.NET.

## Pergunta central
Como acelerar a triagem técnica com IA sem terceirizar diagnóstico, sem perder rastreabilidade e sem transformar alucinação em ação operacional?

## Contexto operacional
Em ambientes com múltiplos serviços .NET, uma degradação real costuma disparar alertas redundantes, logs volumosos e sinais parcialmente conflitantes. A triagem manual demora porque o time precisa separar sintoma, impacto, componente suspeito e evidência confiável antes de decidir quem atua e o que deve ser isolado.

Quando a IA entra sem contenção, o risco não está apenas na resposta errada. O risco real é a resposta errada com aparência de confiança: causa raiz inferida sem evidência suficiente, prioridade inflada, componente errado paginado e runbook acionado fora de contexto.

## Hipótese técnica
IA gera valor em triagem quando seu papel é limitado a classificar e resumir evidências já coletadas, nunca a validar causalidade sozinha. O desenho correto é tratar o modelo como uma etapa assistiva dentro de um pipeline com entradas estruturadas, saídas restritas, limiar de confiança, whitelist de categorias e fallback humano.

## Decisão de arquitetura recomendada
Implementar um pipeline de triagem em C#/.NET com cinco proteções explícitas:

1. Pacote de evidências estruturado antes de chamar o modelo.
2. Saída em schema fechado com categorias permitidas.
3. Resposta só aproveitada quando referenciar evidências reais do pacote.
4. Limiar mínimo de confiança para automação parcial.
5. Escalonamento humano obrigatório quando houver ambiguidade, categoria fora da whitelist ou ausência de lastro observável.

## Trade-offs
- Ganho de velocidade na triagem inicial versus menor liberdade do modelo para explorar hipóteses fora do fluxo permitido.
- Menor ruído operacional versus maior esforço de engenharia para manter schema, catálogo de categorias e validações.
- Apoio prático ao time de sustentação versus impossibilidade de delegar decisão final para a IA.

## Riscos e limites
- Modelo desatualizado pode classificar sinais novos de forma imprecisa.
- Prompt bom não compensa telemetria ruim ou pacote de evidências incompleto.
- Confiança numérica não substitui validação causal.
- Automação de mitigação não deve depender de texto livre do modelo.

## Material para escrita
- Título sugerido: IA não é root cause engine: guardrails para triagem técnica em C#/.NET
- Linha de argumentação: o valor da IA aparece quando ela acelera o caminho até a hipótese útil, mas fica confinada por evidência rastreável e regras de segurança operacional.
- Pontos obrigatórios:
  - separar triagem de diagnóstico definitivo;
  - mostrar os guardrails como decisão arquitetural, não como detalhe de prompt;
  - incluir exemplo em C#/.NET com validação de evidência e confidence gate;
  - fechar com checklist reaplicável em produção.
