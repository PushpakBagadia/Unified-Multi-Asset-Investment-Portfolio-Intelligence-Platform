const express = require('express');
const { searchMarket, getQuote, getChart, getIndices } = require('../controllers/marketController');

const router = express.Router();

router.get('/search', searchMarket);
router.get('/indices', getIndices);
router.get('/quote/:symbol', getQuote);
router.get('/chart/:symbol', getChart);

module.exports = router;
