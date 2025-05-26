const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/api/nome/:nome', async (req, res) => {
  const nome = req.params.nome;
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar nome' });
  }
});

app.get('/api/localidade/:codigoUF', async (req, res) => {
  const codigoUF = req.params.codigoUF;
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=${codigoUF}`);
    const top3 = response.data[0].res.slice(0, 3);
    res.json(top3);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar localidade' });
  }
});

app.get('/api/comparar/:nome1/:nome2', async (req, res) => {
  const { nome1, nome2 } = req.params;
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome1}|${nome2}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao comparar nomes' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));