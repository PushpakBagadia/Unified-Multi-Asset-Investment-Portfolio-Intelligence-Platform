const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = module.exports = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/users', userRoutes);
app.use('/api/market', marketRoutes);
