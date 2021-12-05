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
    // const fetchedCrypto = response.data.data.filter((element) => element.name === req.body.name)
    const fetchedCrypto = [
      {
        id: 1966,
        name: 'Decentraland',
        symbol: 'MANA',
        slug: 'decentraland',
        num_market_pairs: 192,
        date_added: '2017-09-17T00:00:00.000Z',
        tags: [
          'platform',
          'collectibles-nfts',
          'gaming',
          'payments',
          'metaverse',
          'boostvc-portfolio',
          'dcg-portfolio',
          'fabric-ventures-portfolio',
          'kinetic-capital',
          'polygon-ecosystem',
          'play-to-earn'
        ],
        max_supply: null,
        circulating_supply: 1824617134.8740842,
        total_supply: 2193982127.320146,
        platform: {
          id: 1027,
          name: 'Ethereum',
          symbol: 'ETH',
          slug: 'ethereum',
          token_address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942'
        },
        cmc_rank: 23,
        last_updated: '2021-11-27T13:51:44.000Z',
        quote: { EUR: [Object] }
      }
    ]
    const values = fetchedCrypto[0].quote.EUR
    const crypto = await Crypto.create({
      name: req.body.name,
      price: values.price,
      percentageChange: values.percent_change_30d,
      pricePurchase: req.body.pricePurchase,
      quantityPurchase: req.body.quantityPurchase,
      buyingDate: req.body.buyingDate
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
    const cryptos = await Crypto.findAll()
    cryptos.forEach((crypto) => {
      const foundCrypto = response.data.data.filter((element) => element.name === crypto.name)[0]
      crypto.price = foundCrypto.quote.EUR.price
      crypto.percentage_change = foundCrypto.quote.EUR.percent_change_30d
      crypto.price_purchase = req.body.price_purchase
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