const express = require('express');
const CryptoController = require('../controllers/cryptos');

const router = express.Router();

// GET /cryptos
router.get('/cryptos', CryptoController.getCryptos);

// POST /crypto
router.post('/crypto', CryptoController.createCrypto);

// PUT /crypto
router.put('/crypto/:id', CryptoController.updateCrypto);

// GET /update_cryptos
router.get('/update_cryptos', CryptoController.updateCryptos);

// PUT /checkout_crypto
router.put('/checkout_crypto/:id', CryptoController.checkoutCrypto);

// PUT /swap_crypto
router.put('/swap_crypto/:id', [CryptoController.deleteCrypto, CryptoController.createCrypto]);

module.exports = router;