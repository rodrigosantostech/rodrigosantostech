---
execution: inline
agent: researcher
inputFile: squads/csharp-realworld-blogger/output/topic-request.md
outputFile: squads/csharp-realworld-blogger/output/research-findings.md
---

# Step 02: Research

## Context Loading
- squads/csharp-realworld-blogger/output/topic-request.md
- squads/csharp-realworld-blogger/pipeline/data/research-brief.md
- squads/csharp-realworld-blogger/pipeline/data/domain-framework.md
- squads/csharp-realworld-blogger/pipeline/data/anti-patterns.md

## Instructions
### Process
1. Ler o tema escolhido e delimitar a pergunta central do post.
2. Construir um briefing com cenário, hipótese, decisão e trade-offs.
3. Garantir que o recorte técnico principal seja C#/.NET.

## Output Format
```markdown
# Research Findings

## Tema
...

## Pergunta central
...

## Contexto operacional
...

## Hipótese técnica
...

## Decisão de arquitetura recomendada
...

## Trade-offs
- ...
- ...

## Riscos e limites
- ...

## Material para escrita
- Título sugerido
- Linha de argumentação
- Pontos obrigatórios
```

## Veto Conditions
1. Não há conexão direta com C#/.NET.
2. Não há trade-off explícito.

## Quality Criteria
- [ ] Tema com problema real.
- [ ] Decisão técnica explícita.
- [ ] Riscos descritos.
