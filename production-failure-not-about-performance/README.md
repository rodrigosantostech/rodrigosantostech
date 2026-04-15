# production-failure-not-about-performance

Repositório complementar ao artigo "O dia em que performance não era o problema - e mesmo assim o sistema caía".

## Propósito

Demonstrar como um sistema pode entrar em colapso sem saturar CPU ou memória, apenas por amplificação de chamadas causada por retry agressivo em uma dependência externa.

## O que este projeto mostra

O foco aqui não é benchmark sintético nem otimização isolada. O objetivo é tornar visível um modo de falha comum em sistemas distribuídos:

- erro transitório em integração externa;
- retries em mais de uma camada;
- multiplicação de trabalho inútil;
- fila crescendo mais rápido do que a capacidade de drenagem.

## Estrutura

- `context/`: contexto operacional do incidente.
- `docs/`: notas de arquitetura e modo de falha.
- `src/`: simulação executável.
- `postmortem.md`: análise consolidada do incidente.

## Como rodar

Pré-requisito: Node.js 18+.

```bash
node src/simulation.js
```

A saída mostra, por segundo:

- volume de requisições;
- tentativas totais após retries;
- carga da fila;
- descarte por saturação;
- taxas de sucesso e falha.

## Leitura recomendada

Para entender o racional arquitetural por trás da simulação, leia também:

- `context/incident-context.md`
- `docs/architecture.md`
- `postmortem.md`

## Motivação técnica

Resiliência sem governança de retries pode piorar um incidente em vez de contê-lo. Este repositório existe para tornar esse comportamento observável e facilitar discussões de trade-off entre disponibilidade imediata e estabilidade sistêmica.
