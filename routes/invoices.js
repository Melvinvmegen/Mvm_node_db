const express = require('express');
const { body } = require('express-validator')

const InvoiceController = require('../controllers/invoices');

const router = express.Router();

// GET /invoices
router.get('/invoices', InvoiceController.getInvoices);

// POST /invoice
router.post('/invoice', [
  body('firstname').trim().isLength({min: 1}),
  body('lastname').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], InvoiceController.createInvoice);

// GET /invoice
router.get('/invoice/:id', InvoiceController.showInvoice);

// PUT /invoice
router.put('/invoice/:id', InvoiceController.updateInvoice);

// DELETE /invoice
router.delete('/invoice/:id', InvoiceController.deleteInvoice);

module.exports = router;