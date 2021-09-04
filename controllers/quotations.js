const { validationResult, Result } = require('express-validator')
const Quotation = require('../models/quotation')
const InvoiceItem = require('../models/invoiceItem')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

exports.getQuotations = (req, res, next) => {
  Quotation.findAll({ include: InvoiceItem })
  .then(quotations => res.status(200).json(quotations))
  .catch(err => console.log(err))
}

exports.showQuotation = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id, { include: InvoiceItem } )
  .then(quotation => {
    if (!quotation) {
      res.status(404).json({ message: 'Quotation not found' })
    }
    const quotationName = 'quotation-' + quotation.id + '.pdf'
    const quotationPath = path.join('data', 'quotations', quotationName)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${quotationName}"`)

    const pdfDoc = new PDFDocument()
    pdfDoc.pipe(fs.createWriteStream(quotationPath)) 
    pdfDoc.pipe(res)
    pdfDoc.fontSize(26).text('Quotation')
    pdfDoc.text('---------------------------')
    quotation.invoiceItems.forEach(invoice_item => {
      pdfDoc.text(`
        ${invoice_item.name} - ${invoice_item.unit} - ${invoice_item.quantity} = ${invoice_item.total}` )
    })
    pdfDoc.end()
  })
  .catch(err => console.log(err))
}

exports.createQuotation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
  }
  Quotation.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    company: req.body.company,
    address: req.body.address,
    city: req.body.city,
    paid: req.body.paid,
    total: req.body.total,
    payment_date: req.body.payment_date,
    customerId: req.body.customerId,
    invoiceItems: req.body.invoice_items
  }, { include: Quotation.InvoiceItems })
  .then(quotation => {
      res.status(201).json({
        message: 'Quotation created successfully',
        quotation
      })
    })
  .catch(err => console.log(err))
}

exports.updateQuotation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
  }
  let quotation;
  Quotation.findByPk(req.params.id, { include: InvoiceItem })
    .then(quotation => {
      quotation.firstname = req.body.firstname,
      quotation.lastname = req.body.lastname,
      quotation.company = req.body.company,
      quotation.address = req.body.address,
      quotation.city = req.body.city,
      quotation.paid = req.body.paid,
      quotation.total = req.body.total,
      quotation.payment_date = req.body.payment_date
      quotation = quotation
      return quotation.save()
    })
  .then(quotation => {
		const all_invoice_items = quotation.invoiceItems
		const mutable_invoice_items = req.body.invoice_items
		const diff = mutable_invoice_items.filter(function(initial_invoice_item) {
			return all_invoice_items.some(function(mutable_invoice_item) {
				return initial_invoice_item.id == mutable_invoice_item.id
			})
		})
    const promises = [];
    diff.forEach(invoice_item => {
      InvoiceItem.findByPk(invoice_item.id).then(found_invoice_item => {
        found_invoice_item.quantity = invoice_item.quantity,
        found_invoice_item.unit = invoice_item.unit,
        found_invoice_item.total = invoice_item.total
        promises.push(found_invoice_item.save())
      })
    })

    Promise.all(promises)
    .then(result => {
      res.status(201).json({
        message: 'Quotation updated successfully',
        quotation
      })
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}


exports.deleteQuotation = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id)
  .then(quotation => {
    if (!quotation) {
      res.status(404).json({ message: 'Quotation not found' })
    }
    return quotation.destroy()
  })
  .then(result => res.status(200).json({message: 'Quotation successfully destroyed'}))
  .catch(err => console.log(err))
}