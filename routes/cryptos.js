const express = require('express');
const CryptoController = require('../controllers/cryptos');

const router = express.Router();

// GET /cryptos
router.get('/cryptos', CryptoController.getCryptos);

// POST /crypto
router.post('/crypto', CryptoController.createCrypto);

// PUT /crypto
router.put('/crypto/:id', CryptoController.updateCrypto);

// GET /crypto
router.get('/updateCryptos', CryptoController.updateCryptos);

// PUT /crypto
router.put('/checkout_crypto/:id', CryptoController.checkoutCrypto);

module.exports = router;