const express = require('express');
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')

const CustomerController = require('../controllers/customers');

const router = express.Router();

// GET /customers
router.get('/customers', isAuth, CustomerController.getCustomers);

// POST /customer
router.post('/customer', isAuth, [
  body('firstName').trim().isLength({min: 1}),
  body('lastName').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], CustomerController.createCustomer);

// GET /customer
router.get('/customer/:id', isAuth, CustomerController.showCustomer);

// PUT /customer
router.put('/customer/:id', isAuth, CustomerController.updateCustomer);

// DELETE /customer
router.delete('/customer/:id', isAuth, CustomerController.deleteCustomer);

module.exports = router;