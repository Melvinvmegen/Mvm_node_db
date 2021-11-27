const db = require('../models/index');
const { Crypto, Credit } = db
const axios = require('axios').default;

// GET /cryptos
exports.getCryptos = async (req, res, next) => {
  try {
    const cryptos = await Crypto.findAll()
    res.status(200).json(cryptos)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

// POST /crypto
exports.createCrypto = async (req, res, next) => {
  let requestOptions = {
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    params: {
      'start': '1',
      'limit': '5000',
      'convert': 'EUR'
    },
    headers: {
      'X-CMC_PRO_API_KEY': '9a874839-5e36-4cec-bcbe-ac2f7927c74f'
    },
    json: true,
    gzip: true
  };
  try {
    const response = await axios(requestOptions)
    const fetchedCrypto = response.data.data.filter((element) => element.name === req.body.name)
    const crypto = await Crypto.create({
      name: req.body.name,
      price: fetchedCrypto.quote.EUR.price,
      percentage_change: fetchedCrypto.quote.EUR.percent_change_30d,
      price_purchase: req.body.price_purchase
    })
    res.status(201).json({ message: 'Crypto created successfully', crypto })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
};

// PUT /crypto
exports.fetchCrypto = async (req, res, next) => {
  let requestOptions = {
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    params: {
      'start': '1',
      'limit': '5000',
      'convert': 'EUR'
    },
    headers: {
      'X-CMC_PRO_API_KEY': '9a874839-5e36-4cec-bcbe-ac2f7927c74f'
    },
    json: true,
    gzip: true
  };
  try {
    const response = await axios(requestOptions)
    const fetchedCrypto = response.data.data.filter((element) => element.name === req.body.name)
    const crypto = await Crypto.findByPk(req.params.id)
    crypto.name = req.body.name
    crypto.price = fetchedCrypto.quote.EUR.price
    crypto.percentage_change = fetchedCrypto.quote.EUR.percent_change_30d
    crypto.price_purchase = req.body.price_purchase
    await crypto.save()
    res.status(201).json({ message: 'Crypto successfully fetched', crypto })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
};

// PUT /crypto
exports.checkoutCrypto = async (req, res, next) => {
  try {
    const crypto = await Crypto.findByPk(req.params.id)
    const total = crypto.price_purchase - req.body.price_sold

    const credit = await Credit.create({
      creditor: req.body.creditor,
      reason: 'Crypto',
      total: total
    })

    crypto.price_purchase = 0
    await crypto.save()
    res.status(201).json({ message: 'Crypto successfully checkout', credit })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
};