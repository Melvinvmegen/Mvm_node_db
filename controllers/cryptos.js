const db = require('../models/index');
const { Crypto, Credit, Revenu, Transaction } = db
const axios = require('axios').default;
const Sequelize = require('sequelize');

// GET /cryptos
exports.getCryptos = async (req, res, next) => {
  try {
    const cryptos = await Crypto.findAll({
      include: Transaction
    })
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
    const totalTransactions = req.body.Transactions.map(transaction => transaction.price * transaction.quantity).reduce((sum, item) => sum + item, 0)
    const totalQuantityTransactions = req.body.Transactions.map(transaction => transaction.quantity).reduce((sum, item) => sum + item, 0)
    crypto = await Crypto.create({
      name: req.body.name,
      category: req.body.category,
      pricePurchase: totalTransactions / totalQuantityTransactions,
      price: req.body.price || values.price,
      priceChange: values.percent_change_30d || 0,
      Transactions: req.body.Transactions
    }, { include: [ Transaction ] })

    let updateTransactionRevenus = []

    crypto.Transactions.forEach(transaction => {
      const buyingDate = transaction.buyingDate,
      initialDate = new Date(buyingDate),
      firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth()),
      lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
      Revenu.findAll({
        limit: 1,
        where: {
          createdAt: {
            [Op.between]: [firstDay , lastDay],
          }
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then((revenu) => {
        if (revenu.length > 0) {
          transaction.RevenuId = revenu[0].id
          updateTransactionRevenus.push(transaction.save())
        }
      })
    })
    await Promise.all(updateTransactionRevenus)
    res.status(201).json({ message: 'Crypto created successfully', crypto })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
};

// PUT /crypto
exports.updateCrypto = async (req, res, next) => {
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
    const Op = Sequelize.Op
    const response = await axios(requestOptions)
    const fetchedCrypto = response.data.data.filter((element) => element.name === req.body.name)
    const values = fetchedCrypto[0].quote.EUR
    const totalTransactions = req.body.Transactions.map(transaction => transaction.price * transaction.quantity).reduce((sum, item) => sum + item, 0)
    const totalQuantityTransactions = req.body.Transactions.map(transaction => transaction.quantity).reduce((sum, item) => sum + item, 0)
    let crypto = await Crypto.findByPk(req.params.id, { include: Transaction })
    buyingDate = req.body.buyingDate
    crypto.name = req.body.name
    crypto.category = req.body.category
    crypto.pricePurchase = totalTransactions / totalQuantityTransactions
    crypto.price = req.body.price || values.price
    crypto.priceChange = values.percent_change_30d || 0
    crypto = await crypto.save()
    const all_transactions = crypto.Transactions
    const mutable_transactions = req.body.Transactions
    if (mutable_transactions) {
      const diff = mutable_transactions.filter(function(mutable_transaction) {
        return !all_transactions.some(function(initial_transaction) {
          return initial_transaction.id == mutable_transaction.id
        })
      })
      const included = mutable_transactions.filter(function(mutable_transaction) {
        return all_transactions.some(function(initial_transaction) {
          return initial_transaction.id == mutable_transaction.id
        })
      })
      const createTransactionsPromises = [];
      diff.forEach(transaction => {
        const buyingDate = transaction.buyingDate,
        initialDate = new Date(buyingDate),
        firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth()),
        lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
        Revenu.findAll({
          limit: 1,
          where: {
            createdAt: {
              [Op.between]: [firstDay , lastDay],
            }
          },
        }).then((revenu) => {
          if (revenu.length > 0) {
            transaction.RevenuId = revenu[0].id
          }  
          createTransactionsPromises.push(Transaction.create(transaction))
        })
      })
    
      await Promise.all(createTransactionsPromises)
      const updateTransactionsPromises = [];
  
      included.forEach(transaction => {
        Transaction.findByPk(transaction.id).then(found_transaction => {
          if (transaction._destroy) {
            updateTransactionsPromises.push(found_transaction.destroy())
          } else {
            found_transaction.buyingDate = transaction.buyingDate
            found_transaction.exchange = transaction.exchange
            found_transaction.price = transaction.price
            found_transaction.quantity = transaction.quantity
            found_transaction.fees = transaction.fees
            found_transaction.total = transaction.total 
            const buyingDate = found_transaction.buyingDate
            const initialDate = new Date(buyingDate),
            firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth()),
            lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
            Revenu.findAll({
              where: {
                createdAt: {
                  [Op.between]: [firstDay , lastDay],
                }
              }
            }).then((revenu) => {
              if (revenu.length > 0) {
                found_transaction.RevenuId = revenu[0].id
              }          
              updateTransactionsPromises.push(found_transaction.save())
            })
          }
        })
      })
  
      await Promise.all(updateTransactionsPromises)
    }

    crypto = await crypto.reload()
    crypto = await crypto.save()
    crypto = await Crypto.findByPk(crypto.id, { include: Transaction })

    return res.status(201).json({ message: 'Crypto successfully updated', crypto })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
};


// GET /updateCryptos
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
    const response = await axios(requestOptions),
          cryptos = await Crypto.findAll()
    let updateCryptoPromises = []

    cryptos.forEach((crypto) => {
      const foundCrypto = response.data.data.filter((element) => element.name === crypto.name)[0]
      crypto.price = foundCrypto.quote.EUR.price
      crypto.percentage_change = foundCrypto.quote.EUR.percent_change_30d
      crypto.priceChange = crypto.price - crypto.pricePurchase
      updateCryptoPromises.push(crypto.save())
      updateCryptoPromises.push(crypto.reload())
    })
    
    await Promise.all(updateCryptoPromises)
    res.status(201).json({ message: 'Crypto successfully fetched', cryptos })
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