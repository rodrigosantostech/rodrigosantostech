---
execution: inline
agent: design-reviewer
inputFile: squads/csharp-realworld-blogger/output/post-draft.md
outputFile: squads/csharp-realworld-blogger/output/post-designed.md
---

# Step 05: Technical Design Review (Astro)

## Context Loading
- squads/csharp-realworld-blogger/output/post-draft.md
- squads/csharp-realworld-blogger/pipeline/data/quality-criteria.md
- squads/csharp-realworld-blogger/pipeline/data/output-examples.md

## Instructions
### Process
1. Melhorar escaneabilidade e estrutura editorial do post para Astro.
2. Inserir tabela Markdown quando houver comparação de opções, critérios ou trade-offs.
3. Inserir bloco de código quando necessário para clareza técnica.
4. Inserir diagrama Mermaid quando o fluxo entre componentes for complexo.
5. Quando um diagrama visual em imagem for mais útil que Mermaid, gerar também um arquivo de especificação de imagem em `output/diagram-spec.md` para posterior renderização com o skill image-creator.
6. Se o MCP de imagem não estiver configurado, manter o diagrama em Mermaid e incluir a especificação de imagem como artefato opcional.
7. Entregar versão diagramada para a revisão linguística.

## Output Format
```markdown
# Design Review Summary
- Status: approved | needs-adjustments
- Ajustes aplicados:
  - estrutura de seções
  - tabela(s) (quando aplicável)
  - bloco(s) de código (quando aplicável)
  - diagrama Mermaid ou especificação de imagem (quando aplicável)

# Designed Post
[post completo, pronto para revisão linguística]
```

## Veto Conditions
1. Adicionar elementos visuais sem ganho técnico de compreensão.
2. Entregar texto sem recursos Astro quando eles forem necessários para explicar a decisão.

## Quality Criteria
- [ ] Estrutura mais legível e escaneável que o rascunho original.
- [ ] Uso de tabela/código/diagrama justificado no contexto.
- [ ] Conteúdo permanece tecnicamente preciso.
