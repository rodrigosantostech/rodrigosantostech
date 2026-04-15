# Rodrigo Santos Tech - Blog Astro

Blog tecnico em Astro + Markdown com deploy no GitHub Pages, focado em engenharia de software em producao.

## Proposito

Construir um espaco de publicacao com posicionamento de engenharia senior/Staff, abordando arquitetura, confiabilidade e trade-offs reais.

## Stack

- Astro
- Markdown (colecao de conteudo)
- GitHub Actions + GitHub Pages

## Estrutura principal

- `src/content/blog/`: artigos em Markdown.
- `src/pages/`: paginas institucionais e rotas do site.
- `.github/workflows/deploy.yml`: pipeline de build e deploy.
- `production-failure-not-about-performance/`: repositorio complementar do primeiro artigo.

## Como rodar localmente

Pre-requisito: Node.js 20+.

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

1. Ajuste `site` em `astro.config.mjs` para seu usuario.
2. Ajuste `base` em `astro.config.mjs` para o nome do repositorio.
3. Faça push para `main`.
4. No GitHub, habilite Pages com source em GitHub Actions.

## Motivacao tecnica

O primeiro artigo e o repositorio complementar tratam de um incidente em que a causa principal nao era performance bruta, mas amplificacao de carga por retries em cascata. O objetivo e transformar um caso real de operacao em conhecimento reutilizavel para engenharia de plataforma e produto.
