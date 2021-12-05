const express = require('express');
const isAuth = require('../middleware/is-auth')
const RevenuController = require('../controllers/revenus');

const router = express.Router();

// GET /revenus
router.get('/revenus', isAuth, RevenuController.getRevenus);

// GET /revenu
router.get('/revenu/:id', isAuth, RevenuController.showRevenu);

// PUT /revenu
router.put('/revenu/:id', isAuth, RevenuController.updateRevenu);

module.exports = router;