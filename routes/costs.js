const express = require('express');
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')

const CostController = require('../controllers/costs');

const router = express.Router();

// POST /cost
router.post('/cost', isAuth, CostController.createCost);

// PUT /cost
router.put('/cost/:id', isAuth, CostController.updateCost);

// DELETE /cost
router.delete('/cost/:id', isAuth, CostController.deleteCost);

module.exports = router;