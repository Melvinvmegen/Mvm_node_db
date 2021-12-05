const express = require('express');
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')

const InvoiceController = require('../controllers/invoices');

const router = express.Router();

// GET /invoices
router.get('/invoices', isAuth, InvoiceController.getInvoices);

// POST /invoice
router.post('/invoice', isAuth, [
  body('firstName').trim().isLength({min: 1}),
  body('lastName').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
], InvoiceController.createInvoice);

// GET /invoice
router.get('/invoice/:id', isAuth, InvoiceController.showInvoice);

// PUT /invoice
router.put('/invoice/:id', isAuth, InvoiceController.updateInvoice);

// GET /send_invoice
router.get('/send_invoice', isAuth, InvoiceController.sendInvoice);

// DELETE /invoice
router.delete('/invoice/:id', isAuth, InvoiceController.deleteInvoice);

module.exports = router;