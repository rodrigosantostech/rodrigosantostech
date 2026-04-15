const config = {
  baseRequestsPerSecond: 120,
  providerFailureRate: 0.28,
  retryAttempts: 4,
  retryMultiplier: 2,
  queueCapacityPerSecond: 450,
  simulationSeconds: 20
};

function providerCall() {
  return Math.random() > config.providerFailureRate;
}

function runSecond(second) {
  const incoming = config.baseRequestsPerSecond;
  let totalAttempts = 0;
  let successes = 0;
  let queueLoad = 0;

  for (let i = 0; i < incoming; i += 1) {
    let attempt = 0;
    let ok = false;

    while (attempt <= config.retryAttempts && !ok) {
      attempt += 1;
      totalAttempts += 1;
      queueLoad += 1;
      ok = providerCall();

      if (!ok && attempt <= config.retryAttempts) {
        const amplifiedAttempts = config.retryMultiplier - 1;
        totalAttempts += amplifiedAttempts;
        queueLoad += amplifiedAttempts;
      }
    }

    if (ok) successes += 1;
  }

  const dropped = Math.max(queueLoad - config.queueCapacityPerSecond, 0);
  const failureRate = ((incoming - successes) / incoming) * 100;

  return {
    second,
    incoming,
    totalAttempts,
    queueLoad,
    dropped,
    successRate: ((successes / incoming) * 100).toFixed(1),
    failureRate: failureRate.toFixed(1)
  };
}

function printRow(data) {
  const line = [
    `t=${String(data.second).padStart(2, "0")}s`,
    `req=${data.incoming}`,
    `attempts=${data.totalAttempts}`,
    `queue=${data.queueLoad}`,
    `drop=${data.dropped}`,
    `ok=${data.successRate}%`,
    `fail=${data.failureRate}%`
  ];

  console.log(line.join(" | "));
}

console.log("Simulacao: falha em cascata por retry agressivo\n");

for (let second = 1; second <= config.simulationSeconds; second += 1) {
  const snapshot = runSecond(second);
  printRow(snapshot);
}
