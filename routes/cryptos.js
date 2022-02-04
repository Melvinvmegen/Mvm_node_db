const express = require('express');
const isAuth = require('../middleware/is-auth')

const CryptoController = require('../controllers/cryptos');

const router = express.Router();

// GET /cryptos
router.get('/cryptos', isAuth, CryptoController.getCryptos);

// POST /crypto
router.post('/crypto', isAuth, CryptoController.createCrypto);

// PUT /crypto
router.put('/crypto/:id', isAuth, CryptoController.updateCrypto);

// GET /crypto
router.get('/updateCryptos', isAuth, CryptoController.updateCryptos);

// PUT /crypto
router.put('/checkout_crypto/:id', isAuth, CryptoController.checkoutCrypto);

module.exports = router;