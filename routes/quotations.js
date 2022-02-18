const express = require('express');
const { body } = require('express-validator')

const QuotationController = require('../controllers/quotations');

const router = express.Router();

// GET /quotations
router.get('/quotations', QuotationController.getQuotations);

// POST /quotation
router.post('/quotation', [
  body('firstName').trim().isLength({min: 1}),
  body('lastName').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
], QuotationController.createQuotation);

// POST /quotation
router.post('/convert_quotation/:id', QuotationController.convertToInvoice);

// POST /quotation
router.post('/quotation_caution_paid/:id', QuotationController.cautionPaid);

// GET /quotation
router.get('/quotation/:id', QuotationController.showQuotation);

// PUT /quotation
router.put('/quotation/:id', QuotationController.updateQuotation);

// DELETE /quotation
router.delete('/quotation/:id', QuotationController.deleteQuotation);

module.exports = router;