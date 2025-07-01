const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).send('Missing parameters');
  const result = Number(a) + Number(b);
  res.json({ result });
});

app.get('/subtract', (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).send('Missing parameters');
  const result = Number(a) - Number(b);
  res.json({ result });
});

app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

module.exports = app;
