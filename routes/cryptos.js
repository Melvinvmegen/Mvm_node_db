const express = require('express');
const isAuth = require('../middleware/is-auth')

const CryptoController = require('../controllers/cryptos');

const router = express.Router();

// GET /cryptos
router.get('/cryptos', isAuth, CryptoController.getCryptos);

// POST /crypto
router.post('/crypto', isAuth, CryptoController.createCrypto);

// POST /crypto
router.post('/crypto', isAuth, CryptoController.fetchCrypto);

// PUT /crypto
router.put('/checkout_crypto/:id', isAuth, CryptoController.checkoutCrypto);

module.exports = router;