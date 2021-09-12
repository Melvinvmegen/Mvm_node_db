const express = require('express');
const { body } = require('express-validator')

const InvoiceController = require('../controllers/invoices');

const router = express.Router();

// GET /invoices
router.get('/invoices', isAuth, InvoiceController.getInvoices);

// POST /invoice
router.post('/invoice', isAuth, [
  body('firstname').trim().isLength({min: 1}),
  body('lastname').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], InvoiceController.createInvoice);

// GET /invoice
router.get('/invoice/:id', isAuth, InvoiceController.showInvoice);

// PUT /invoice
router.put('/invoice/:id', isAuth, InvoiceController.updateInvoice);

// DELETE /invoice
router.delete('/invoice/:id', isAuth, InvoiceController.deleteInvoice);

module.exports = router;