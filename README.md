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

## Perfil

<h2 align="center">Hi 👋! My name is Rodrigo and I'm a Software Engenieer .NET</h2>

###

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dracula&locale=pt-br&hide_border=false&username=rodrigosantostech" height="150" alt="stats graph"  />
  <img src="https://github-readme-stats.vercel.app/api/top-langs?locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dracula&hide_border=false&username=rodrigosantostech" height="150" alt="languages graph"  />
</div>

###


###

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" height="30" width="42" alt="csharp logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" height="30" width="42" alt="dot-net logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" height="30" width="42" alt="dotnetcore logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" height="30" width="42" alt="microsoftsqlserver logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" height="30" width="42" alt="typescript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="30" width="42" alt="react logo"  />
</div>

<div align="center">
  <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="instagram logo"  />
  <a href="https://www.linkedin.com/in/rodrigosilvacs/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo"  />
  </a>
</div>

###

<div align="center">
  <a href="https://open.spotify.com/user/Rodrigo Santos">
    <img src="https://spotify-recently-played-readme.vercel.app/api?user=rodrigosilva34" alt="Spotify recently played"  />
  </a>
</div>
