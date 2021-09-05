const express = require('express');
const { body } = require('express-validator')

const CreditController = require('../controllers/credits');

const router = express.Router();

// POST /credit
router.post('/credit', CreditController.createCredit);

// PUT /credit
router.put('/credit/:id', CreditController.updateCredit);

// DELETE /credit
router.delete('/credit/:id', CreditController.deleteCredit);

module.exports = router;