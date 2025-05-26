async function buscarEvolucaoNome() {
  const nome = document.getElementById('nomeInput').value;
  const res = await fetch(`http://localhost:3000/api/nome/${nome}`);
  const data = await res.json();
  const { res: dados } = data[0];

  const labels = dados.map(d => d.periodo);
  const valores = dados.map(d => d.frequencia);

  new Chart(document.getElementById('graficoNome'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: nome, data: valores, borderColor: 'blue', fill: false }]
    }
  });
}

async function buscarTop3() {
  const uf = document.getElementById('ufInput').value;
  const res = await fetch(`http://localhost:3000/api/localidade/${uf}`);
  const dados = await res.json();

  const tbody = document.getElementById('tabelaNomes').querySelector('tbody');
  tbody.innerHTML = '';
  dados.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.nome}</td><td>${d.frequencia}</td><td>${d.ranking}</td>`;
    tbody.appendChild(tr);
  });
}

async function compararNomes() {
  const nome1 = document.getElementById('nome1').value;
  const nome2 = document.getElementById('nome2').value;
  const res = await fetch(`http://localhost:3000/api/comparar/${nome1}/${nome2}`);
  const dados = await res.json();

  const labels = dados[0].res.map(r => r.periodo);

  new Chart(document.getElementById('graficoComparacao'), {
    type: 'line',
    data: {
      labels,
      datasets: dados.map((d, i) => ({
        label: d.nome,
        data: d.res.map(p => p.frequencia),
        borderColor: i === 0 ? 'red' : 'green',
        fill: false
      }))
    }
  });
}
