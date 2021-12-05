const db = require('../models/index');
const { Crypto, Credit, Cost, Revenu } = db
const axios = require('axios').default;
const Sequelize = require('sequelize');

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
  const Op = Sequelize.Op
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
    const values = fetchedCrypto[0].quote.EUR
    const buyingDate = req.body.buyingDate
    const crypto = await Crypto.create({
      name: req.body.name,
      price: values.price,
      percentageChange: values.percent_change_30d,
      pricePurchase: req.body.pricePurchase,
      quantityPurchase: req.body.quantityPurchase,
      buyingDate: buyingDate,
      fees: req.body.fees
    })

    const initialDate = new Date(buyingDate)
    const firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth())
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)

    const revenu = await Revenu.findAll({
      where: {
        createdAt: {
          [Op.between]: [firstDay , lastDay],
        } 
      }
    })

    await Cost.create({
      name: crypto.name,
      total: crypto.pricePurchase * crypto.quantityPurchase + crypto.fees,
      RevenuId: revenu[0].id
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
exports.updateCryptos = async (req, res, next) => {
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
    const cryptos = await Crypto.findAll()
    let crypto;
    cryptos.forEach((cryptoObj) => {
      crypto = cryptoObj
      const foundCrypto = response.data.data.filter((element) => element.name === crypto.name)[0]
      crypto.price = foundCrypto.quote.EUR.price
      crypto.percentage_change = foundCrypto.quote.EUR.percent_change_30d
      crypto.priceChange = crypto.price - crypto.pricePurchase
    })
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