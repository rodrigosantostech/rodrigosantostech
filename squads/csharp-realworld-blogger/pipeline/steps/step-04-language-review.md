---
execution: inline
agent: language-reviewer
inputFile: squads/csharp-realworld-blogger/output/post-designed.md
outputFile: squads/csharp-realworld-blogger/output/post-language-reviewed.md
---

# Step 06: Language Review (PT-BR)

## Context Loading
- squads/csharp-realworld-blogger/output/post-designed.md
- squads/csharp-realworld-blogger/pipeline/data/quality-criteria.md
- squads/csharp-realworld-blogger/pipeline/data/tone-of-voice.md

## Instructions
### Process
1. Revisar ortografia, acentuação e pontuação em todo o texto, obrigatoriamente em PT-BR.
2. Melhorar fluidez, naturalidade e encadeamento de ideias sem descaracterizar a voz técnica.
3. Entregar a versão linguística revisada para a etapa de revisão técnica final.

## Output Format
```markdown
# Language Review Summary
- Status: approved | needs-adjustments
- Ajustes aplicados:
  - ortografia e acentuação
  - pontuação e ritmo de leitura
  - fluidez e naturalidade

# Language Reviewed Post
[post completo com linguagem revisada em PT-BR]
```

## Veto Conditions
1. Aprovar texto com erro ortográfico, de acentuação ou de pontuação relevante.
2. Reescrever em tom artificial ou com perda de precisão técnica.

## Quality Criteria
- [ ] Ortografia em PT-BR correta.
- [ ] Acentuação correta em todo o texto.
- [ ] Pontuação consistente e legível.
- [ ] Linguagem natural, fluida e técnica.
