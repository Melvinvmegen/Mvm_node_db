const express = require('express');
const { body } = require('express-validator')

const QuotationController = require('../controllers/quotations');

const router = express.Router();

// GET /quotations
router.get('/quotations', QuotationController.getQuotations);

// POST /quotation
router.post('/quotation', [
  body('firstname').trim().isLength({min: 1}),
  body('lastname').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], QuotationController.createQuotation);

// POST /quotation
router.post('/convert_quotation/:id', QuotationController.convertToInvoice);

// GET /quotation
router.get('/quotation/:id', QuotationController.showQuotation);

// PUT /quotation
router.put('/quotation/:id', QuotationController.updateQuotation);

// DELETE /quotation
router.delete('/quotation/:id', QuotationController.deleteQuotation);

module.exports = router;