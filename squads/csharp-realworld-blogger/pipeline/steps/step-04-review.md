---
execution: inline
agent: editor
inputFile: squads/csharp-realworld-blogger/output/post-language-reviewed.md
outputFile: squads/csharp-realworld-blogger/output/post-final.md
---

# Step 07: Technical Review

## Context Loading
- squads/csharp-realworld-blogger/output/post-language-reviewed.md
- squads/csharp-realworld-blogger/pipeline/data/quality-criteria.md
- squads/csharp-realworld-blogger/pipeline/data/tone-of-voice.md

## Instructions
### Process
1. Revisar consistência técnica, clareza e aderência ao tom após a revisão linguística.
2. Validar que ortografia, acentuação, pontuação e fluidez em PT-BR já estão corretas e não foram degradadas.
3. Corrigir frontmatter e pontos críticos de conteúdo.
4. Entregar versão final pronta para publicação.

## Output Format
```markdown
# Review Summary
- Status: approved | needs-adjustments
- Ajustes aplicados:
  - ...
  - ...

# Final Post
[post completo com frontmatter Astro válido]
```

## Veto Conditions
1. Manter ambiguidades técnicas sem correção.
2. Aprovar sem validar campos obrigatórios do frontmatter.
3. Aprovar texto com problema de ortografia, acentuação, pontuação ou fluidez em PT-BR.

## Quality Criteria
- [ ] Post final pronto para publicar.
- [ ] Sem erros de schema no frontmatter.
- [ ] Mensagem final alinhada ao posicionamento do blog.
- [ ] Revisão linguística em PT-BR preservada até a versão final.
