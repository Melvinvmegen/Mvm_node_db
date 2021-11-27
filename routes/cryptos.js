const express = require('express');
const isAuth = require('../middleware/is-auth')

const CryptoController = require('../controllers/cryptos');

const router = express.Router();

// GET /cryptos
router.get('/cryptos', isAuth, CryptoController.getCryptos);

// POST /crypto
router.post('/crypto', isAuth, CryptoController.createCrypto);

// PUT /crypto
router.post('/crypto/:id', isAuth, CryptoController.fetchCrypto);

// PUT /crypto
router.post('/crypto/:id', isAuth, CryptoController.checkoutCrypto);