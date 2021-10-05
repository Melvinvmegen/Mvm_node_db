const express = require('express');
const { body } = require('express-validator')
const isAuth = require('../middleware/is-auth')

const QuotationController = require('../controllers/quotations');

const router = express.Router();

// GET /quotations
router.get('/quotations', isAuth, QuotationController.getQuotations);

// POST /quotation
router.post('/quotation', isAuth, [
  body('firstname').trim().isLength({min: 1}),
  body('lastname').trim().isLength({min: 1}),
  body('company').trim().isLength({min: 1}),
  body('email').trim().isLength({min: 1}).isEmail(),
], QuotationController.createQuotation);

// POST /quotation
router.post('/convert_quotation/:id', isAuth, QuotationController.convertToInvoice);

// GET /quotation
router.get('/quotation/:id', isAuth, QuotationController.showQuotation);

// PUT /quotation
router.put('/quotation/:id', isAuth, QuotationController.updateQuotation);

// DELETE /quotation
router.delete('/quotation/:id', isAuth, QuotationController.deleteQuotation);

module.exports = router;