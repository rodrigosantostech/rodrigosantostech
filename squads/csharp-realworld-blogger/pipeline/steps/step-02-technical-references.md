---
execution: inline
agent: reference-researcher
inputFile: squads/csharp-realworld-blogger/output/research-findings.md
outputFile: squads/csharp-realworld-blogger/output/technical-references.md
---

# Step 03: Technical References

## Context Loading

- squads/csharp-realworld-blogger/output/topic-request.md
- squads/csharp-realworld-blogger/output/research-findings.md
- squads/csharp-realworld-blogger/pipeline/data/research-brief.md
- squads/csharp-realworld-blogger/pipeline/data/domain-framework.md

## Instructions

### Process

1. Ler o tema e o briefing principal.
2. Buscar de 2 a 5 referências técnicas externas confiáveis para sustentar a argumentação do post.
3. Priorizar Microsoft Learn, documentação oficial .NET, bibliotecas oficiais e fontes reconhecidas de engenharia.
4. Explicar o que cada referência sustenta e qual é seu limite de aplicação.
5. Entregar resumo objetivo para o writer usar durante a redação.

## Output Format

```markdown
# Technical References

## Referências prioritárias

### Referência 1
- Fonte: ...
- URL: ...
- O que sustenta: ...
- Como usar no post: ...
- Limite: ...

### Referência 2
- Fonte: ...
- URL: ...
- O que sustenta: ...
- Como usar no post: ...
- Limite: ...

## Observações para escrita
- ...
- ...
```

## Veto Conditions

1. Entregar apenas links sem contexto.
2. Usar fonte promocional ou sem autoridade clara como base principal.
3. Trazer referências sem relação direta com C#/.NET ou com a decisão técnica do post.

## Quality Criteria

- [ ] Há entre 2 e 5 referências confiáveis.
- [ ] Pelo menos uma referência oficial quando aplicável.
- [ ] Cada referência indica utilidade prática no texto.
- [ ] As limitações das fontes estão explícitas.
