const yahooProvider = require('./providers/yahooProvider');

const provider = yahooProvider;

const search = (query, options) => provider.search(query, options);
const getQuote = (symbol) => provider.getQuote(symbol);
const getChart = (symbol, options) => provider.getChart(symbol, options);
const getIndices = () => provider.getIndices();

module.exports = { search, getQuote, getChart, getIndices };
