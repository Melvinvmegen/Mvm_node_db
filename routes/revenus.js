const express = require('express');

const RevenuController = require('../controllers/revenus');

const router = express.Router();

// GET /revenus
router.get('/revenus', isAuth, RevenuController.getRevenus);

// GET /revenu
router.get('/revenu/:id', isAuth, RevenuController.showRevenu);

module.exports = router;