const express = require('express');
const { body } = require('express-validator')

const CostController = require('../controllers/costs');

const router = express.Router();

// POST /cost
router.post('/cost', CostController.createCost);

// PUT /cost
router.put('/cost/:id', CostController.updateCost);

// DELETE /cost
router.delete('/cost/:id', CostController.deleteCost);

module.exports = router;