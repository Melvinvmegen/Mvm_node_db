const express = require('express');
const { body } = require('express-validator')

const InvoiceController = require('../controllers/invoices');

const router = express.Router();

// GET /invoices
router.get('/invoices', InvoiceController.getInvoices);

// POST /invoice
router.post('/invoice', [
  body('firstName').trim().isLength({min: 1}),
  body('lastName').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
], InvoiceController.createInvoice);

// GET /invoice
router.get('/invoice/:id', InvoiceController.showInvoice);

// PUT /invoice
router.put('/invoice/:id', InvoiceController.updateInvoice);

// GET /send_invoice
router.get('/send_invoice', InvoiceController.sendInvoice);

// DELETE /invoice
router.delete('/invoice/:id', InvoiceController.deleteInvoice);

module.exports = router;