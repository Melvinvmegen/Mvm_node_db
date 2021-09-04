const { validationResult, Result } = require('express-validator')
const Invoice = require('../models/invoice')
const InvoiceItem = require('../models/invoiceItem')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

exports.getInvoices = (req, res, next) => {
  Invoice.findAll({ include: InvoiceItem })
  .then(invoices => res.status(200).json(invoices))
  .catch(err => console.log(err))
}

exports.showInvoice = (req, res, next) => {
  const id = req.params.id
  Invoice.findByPk(id, { include: InvoiceItem } )
  .then(invoice => {
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' })
    }
    const invoiceName = 'invoice-' + invoice.id + '.pdf'
    const invoicePath = path.join('data', 'invoices', invoiceName)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)

    const pdfDoc = new PDFDocument()
    pdfDoc.pipe(fs.createWriteStream(invoicePath)) 
    pdfDoc.pipe(res)
    pdfDoc.fontSize(26).text('Invoice')
    pdfDoc.text('---------------------------')
    invoice.invoiceItems.forEach(invoice_item => {
      pdfDoc.text(`
        ${invoice_item.name} - ${invoice_item.unit} - ${invoice_item.quantity} = ${invoice_item.total}` )
    })
    pdfDoc.end()
  })
  .catch(err => console.log(err))
}

exports.createInvoice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
  }
  Invoice.create({
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
  }, { include: Invoice.InvoiceItems })
  .then(invoice => {
      res.status(201).json({
        message: 'Invoice created successfully',
        invoice
      })
    })
  .catch(err => console.log(err))
}

exports.updateInvoice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
  }
  let invoice;
  Invoice.findByPk(req.params.id, { include: InvoiceItem })
    .then(invoice => {
      invoice.firstname = req.body.firstname,
      invoice.lastname = req.body.lastname,
      invoice.company = req.body.company,
      invoice.address = req.body.address,
      invoice.city = req.body.city,
      invoice.paid = req.body.paid,
      invoice.total = req.body.total,
      invoice.payment_date = req.body.payment_date
      invoice = invoice
      return invoice.save()
    })
  .then(invoice => {
		const all_invoice_items = invoice.invoiceItems
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
        message: 'Invoice updated successfully',
        invoice
      })
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}


exports.deleteInvoice = (req, res, next) => {
  const id = req.params.id
  Invoice.findByPk(id)
  .then(invoice => {
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' })
    }
    return invoice.destroy()
  })
  .then(result => res.status(200).json({message: 'Invoice successfully destroyed'}))
  .catch(err => console.log(err))
}