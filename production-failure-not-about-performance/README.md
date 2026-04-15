# production-failure-not-about-performance

Repositorio complementar ao artigo "O dia em que performance nao era o problema - e mesmo assim o sistema caia".

## Proposito

Demonstrar como um sistema pode entrar em colapso sem saturar CPU ou memoria, apenas por amplificacao de chamadas causada por retry agressivo.

## Estrutura

- `context/`: contexto operacional do incidente.
- `docs/`: notas de arquitetura e modo de falha.
- `src/`: simulacao executavel.
- `postmortem.md`: analise consolidada do incidente.

## Como rodar

Pre-requisito: Node.js 18+.

```bash
node src/simulation.js
```

A saida mostra por segundo:

- volume de requisicoes,
- tentativas totais apos retries,
- carga da fila,
- descarte por saturacao,
- taxas de sucesso/falha.

## Motivacao tecnica

Resiliencia sem governanca de retries pode piorar um incidente. Este repositorio existe para tornar esse comportamento observavel e facilitar discussoes de trade-off entre disponibilidade imediata e estabilidade sistemica.
