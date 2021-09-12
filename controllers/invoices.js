const { validationResult, Result } = require('express-validator')
const Invoice = require('../models/invoice')
const InvoiceItem = require('../models/invoiceItem')
const path = require('path')
const { pdfGenerator } = require('../util/pdfGenerator')

exports.getInvoices = (req, res, next) => {
  Invoice.findAll({ include: InvoiceItem })
  .then(invoices => res.status(200).json(invoices))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.showInvoice = (req, res, next) => {
  const id = req.params.id
  Invoice.findByPk(id, { include: InvoiceItem } )
  .then(invoice => {
    if (!invoice) {
      const error = new Error('Invoice not found.')
      error.statusCode = 404
      throw error
    }
    const invoiceName = 'invoice-' + invoice.id + '.pdf'
    const invoicePath = path.join('data', 'invoices', invoiceName)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)
    let doc = pdfGenerator(invoice, invoicePath)
    doc.pipe(res)
  })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.createInvoice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
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
    revenuId: req.body.revenuId,
    invoiceItems: req.body.invoice_items
  }, { include: Invoice.InvoiceItems })
  .then(invoice => {
      res.status(201).json({
        message: 'Invoice created successfully',
        invoice
      })
    })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.updateInvoice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
  }
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
      invoice.revenuId = req.body.revenuId
      invoice = invoice
      return invoice.save()
    })
  .then(invoice => {
		const all_invoice_items = invoice.invoiceItems
		const mutable_invoice_items = req.body.invoice_items
		const diff = mutable_invoice_items.filter(function(mutable_invoice_item) {
			return !all_invoice_items.some(function(initial_invoice_item) {
				return initial_invoice_item.id == mutable_invoice_item.id
			})
		})
		const included = mutable_invoice_items.filter(function(mutable_invoice_item) {
			return all_invoice_items.some(function(initial_invoice_item) {
				return initial_invoice_item.id == mutable_invoice_item.id
			})
		})
    const promises = [];
    diff.forEach(invoice_item => {
      promises.push(InvoiceItem.create(invoice_item))
    })

    included.forEach(invoice_item => {
      InvoiceItem.findByPk(invoice_item.id).then(found_invoice_item => {
        if (found_invoice_item) {
          found_invoice_item.quantity = invoice_item.quantity,
          found_invoice_item.unit = invoice_item.unit,
          found_invoice_item.total = invoice_item.total
          promises.push(found_invoice_item.save())
        }
      })
    })

    Promise.all(promises)

    .then(result => {
      res.status(201).json({
        message: 'Invoice updated successfully',
        invoice
      })
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500
      }
      next(error)
    })
  })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}


exports.deleteInvoice = (req, res, next) => {
  const id = req.params.id
  Invoice.findByPk(id)
  .then(invoice => {
    if (!invoice) {
      const error = new Error('Invoice not found.')
      error.statusCode = 404
      throw error
    }
    return invoice.destroy()
  })
  .then(result => res.status(200).json({message: 'Invoice successfully destroyed'}))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}