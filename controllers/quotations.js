const { validationResult, Result } = require('express-validator')
const Quotation = require('../models/quotation')
const Invoice = require('../models/invoice')
const InvoiceItem = require('../models/invoiceItem')
const { pdfGenerator } = require('../util/pdfGenerator')
const path = require('path')

exports.getQuotations = (req, res, next) => {
  Quotation.findAll({ include: InvoiceItem })
  .then(quotations => res.status(200).json(quotations))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.showQuotation = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id, { include: InvoiceItem } )
  .then(quotation => {
    if (!quotation) {
      const error = new Error('Quotation not found.')
      error.statusCode = 404
      throw error
    }
    const quotationName = 'quotation-' + quotation.id + '.pdf'
    const quotationPath = path.join('data', 'quotations', quotationName)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${quotationName}"`)

    let doc = pdfGenerator(quotation, quotationPath)
    doc.pipe(res)
  })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.createQuotation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
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
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.updateQuotation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
  }
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
    included.forEach(invoice_item => {
      InvoiceItem.findByPk(invoice_item.id).then(found_invoice_item => {
        if (found_invoice_item) {
          found_invoice_item.quantity = invoice_item.quantity,
          found_invoice_item.unit = invoice_item.unit,
          found_invoice_item.total = invoice_item.total
          return promises.push(found_invoice_item.save())
        }
      })
    })

    diff.forEach(invoice_item => {
      promises.push(InvoiceItem.create(invoice_item))
    })

    Promise.all(promises)
    .then(result => {
      res.status(201).json({
        message: 'Quotation updated successfully',
        quotation
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

exports.convertToInvoice = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id, { include: InvoiceItem })
  .then(quotation => {
    if (!quotation) {
      const error = new Error('Quotation not found.')
      error.statusCode = 404
      throw error
    }
    const invoice_items = quotation.invoiceItems.map((invoice_item) => {
      return object = {
      name: invoice_item.name,
      quantity: invoice_item.quantity,
      unit: invoice_item.unit,
      total: invoice_item.total
      }
    })

    return Invoice.create({
      firstname: quotation.firstname,
      lastname: quotation.lastname,
      company: quotation.company,
      address: quotation.address,
      city: quotation.city,
      total: quotation.total,
      customerId: quotation.customerId,
      invoiceItems: invoice_items
    }, { include: Invoice.InvoiceItems })
  })
  .then(invoice => res.status(200).json({
    invoice: invoice,
    message: 'Quotation successfully converted'
  }))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}


exports.deleteQuotation = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id)
  .then(quotation => {
    if (!quotation) {
      const error = new Error('Quotation not found.')
      error.statusCode = 404
      throw error
    }
    return quotation.destroy()
  })
  .then(result => res.status(200).json({message: 'Quotation successfully destroyed'}))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}