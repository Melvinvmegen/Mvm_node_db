const express = require('express');
const { body } = require('express-validator')

const CustomerController = require('../controllers/customers');

const router = express.Router();

// GET /customers
router.get('/customers', CustomerController.getCustomers);

// POST /customer
router.post('/customer', [
  body('firstname').trim().isLength({min: 1}),
  body('lastname').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], CustomerController.createCustomer);

// GET /customer
router.get('/customer/:id', CustomerController.showCustomer);

// PUT /customer
router.put('/customer/:id', CustomerController.updateCustomer);

// DELETE /customer
router.delete('/customer/:id', CustomerController.deleteCustomer);

module.exports = router;