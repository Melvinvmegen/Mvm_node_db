const { validationResult } = require('express-validator')
const { pdfGenerator } = require('../util/pdfGenerator')
const db = require("../models/index");
const { Invoice, InvoiceItem, Customer } = db
const { sendInvoice } = require('../util/mailer')
const { setFilters } = require('../util/filter')
const { notFound, validationFailed } = require('../util/errorHandler')
const { updateOrCreateChildItems } = require('../util/childItemsHandler')

exports.getInvoices = async (req, res, next) => {
  // Force allows filtering by bypassing the cache without invalidating it
  const force = (req.query.force === 'true')
  const options = setFilters(req.query, InvoiceItem)

  try {
    const invoices = await getOrSetCache(`invoices_customer_${req.query.CustomerId}`, async () => {
      return await Invoice.findAndCountAll(options)
    }, force)
    res.status(200).json(invoices)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showInvoice = async (req, res, next) => {
  const id = req.params.id
  const isPDF = req.query.pdf

  try {
    const invoice = await Invoice.findByPk(id, { include: InvoiceItem } )
    if (!invoice) return notFound(next, 'Invoice')
    if (isPDF) {
      const invoiceName = 'invoice-' + id + '.pdf'
    
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)
      let doc = pdfGenerator(invoice)
      doc.pipe(res)
    } else {
      res.status(200).json(invoice)
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.createInvoice = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationFailed(next)
  try {
    const invoice = await Invoice.create(req.body, { include: InvoiceItem })
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`invoices_customer_${invoice.CustomerId}`)
    res.status(201).json({ message: 'Invoice created successfully', invoice})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.updateInvoice = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationFailed(next)
  try {
    const mutable_invoice_items = req.body.InvoiceItems
    let invoice = await Invoice.findByPk(req.params.id, { include: InvoiceItem })
    Object.keys(req.body).forEach((key) => invoice[key] = req.body[key])
    invoice = await invoice.save()
    
    if (mutable_invoice_items) await updateOrCreateChildItems(InvoiceItem, invoice.InvoiceItems, mutable_invoice_items)
    invoice = await invoice.reload()
    invoice = await invoice.save()
    invoice = await Invoice.findByPk(invoice.id, { include: InvoiceItem })
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`invoices_customer_${invoice.CustomerId}`)
    res.status(201).json({ message: 'Invoice updated successfully', invoice })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.sendInvoice = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.query.CustomerId)
    const message = await sendInvoice(customer.email)
    res.status(200).json({ message: message })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.deleteInvoice = async (req, res, next) => {
  const id = req.params.id
  try {
    const invoice = await Invoice.findByPk(id)
    if (!invoice) return notFound(next, 'Invoice')
    await invoice.destroy()
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`invoices_customer_${invoice.CustomerId}`)
    res.status(200).json({message: 'Invoice successfully destroyed'})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}