---
execution: inline
agent: writer
inputFile: squads/csharp-realworld-blogger/output/research-findings.md
outputFile: squads/csharp-realworld-blogger/output/post-draft.md
---

# Step 04: Draft

## Context Loading

- squads/csharp-realworld-blogger/output/research-findings.md
- squads/csharp-realworld-blogger/output/technical-references.md
- squads/csharp-realworld-blogger/pipeline/data/output-examples.md
- squads/csharp-realworld-blogger/pipeline/data/quality-criteria.md
- squads/csharp-realworld-blogger/pipeline/data/tone-of-voice.md

## Instructions

### Process

1. Escrever o post completo em markdown com frontmatter Astro válido.
2. Estruturar o conteúdo em contexto, problema, decisão, implementação, resultado e conclusão.
3. Incorporar referências técnicas externas confiáveis quando elas reforçarem a decisão, priorizando Microsoft Learn, documentação oficial .NET e fontes reconhecidas.
4. Incluir checklist final de aplicação prática.

## Output Format

```markdown
---
title: ...
description: ...
pubDate: YYYY-MM-DD
tags:
  - dotnet
  - arquitetura
  - reliability
---

## Contexto
...

## O problema real
...

## A decisão de arquitetura
...

## Implementação em C#/.NET
...

## Resultado esperado/medido
...

## Checklist de aplicação
1. ...
2. ...
3. ...

## Conclusão
...
```

## Veto Conditions

1. Frontmatter inválido para Astro.
2. Texto sem decisão arquitetural concreta.

## Quality Criteria

- [ ] Publicável sem retrabalho estrutural.
- [ ] Linguagem técnica pragmática.
- [ ] Aprendizado transferível.
