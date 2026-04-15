---
execution: inline
agent: qa-validator
inputFile: squads/csharp-realworld-blogger/output/post-final.md
outputFile: squads/csharp-realworld-blogger/output/project-checks.md
---

# Step 07: Project Checks (Lint and Build)

## Context Loading
- squads/csharp-realworld-blogger/output/post-final.md
- squads/csharp-realworld-blogger/pipeline/data/quality-criteria.md

## Instructions
### Process
1. Executar `npm run lint` na raiz do projeto.
2. Executar `npm run build` na raiz do projeto.
3. Registrar o resultado de ambos os comandos.
4. Se qualquer comando falhar, marcar status `failed` e listar bloqueadores.
5. Se ambos passarem, marcar status `approved`.

## Output Format
```markdown
# Project Checks Summary
- Status: approved | failed
- Lint: pass | fail
- Build: pass | fail
- Bloqueadores:
  - ...

# Evidence
- comando: npm run lint
  resultado: ...
- comando: npm run build
  resultado: ...
```

## Veto Conditions
1. Não executar os dois comandos obrigatórios.
2. Aprovar com falha em lint ou build.

## Quality Criteria
- [ ] Lint executado e validado.
- [ ] Build executado e validado.
- [ ] Evidência mínima registrada no relatório.
