const express = require('express');

const app = module.exports = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});
