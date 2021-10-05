const { validationResult } = require('express-validator')
const Invoice = require('../models/invoice')
const InvoiceItem = require('../models/invoiceItem')
const path = require('path')
const { pdfGenerator } = require('../util/pdfGenerator')
const Sequelize = require('sequelize')
const { cpSync } = require('fs')

exports.getInvoices = async (req, res, next) => {
  const Op = Sequelize.Op
  const queryParams = req.query
  const offset = +queryParams.currentPage > 1 ? (+queryParams.currentPage * +queryParams.perPage) - +queryParams.perPage : 0
  const limit = queryParams.perPage
  const options = { 
    limit, 
    offset, 
    where: [],
    distinct: true,
    include: InvoiceItem
  }

  if (queryParams.name) {
    options.where.push({[Op.or]: [
      { firstname: {[Op.iLike]: `%${queryParams.name}%`} },
      { lastname: {[Op.iLike]: `%${queryParams.name}%`} }
    ]})
  }

  if (queryParams.customerId) {
    options.where.push({customerId: {[Op.eq]: +queryParams.customerId}})
  }

  if (queryParams.total) {
    options.where.push({total: {[Op.eq]: +queryParams.total}})
  }

  try {
    const invoices = await Invoice.findAndCountAll(options)
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
    if (!invoice) {
      const error = new Error('Invoice not found.')
      error.statusCode = 404
      next(error)
    }
    if (isPDF) {
      const invoiceName = 'invoice-' + invoice.id + '.pdf'
      const invoicePath = path.join('data', 'invoices', invoiceName)
    
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)
      let doc = pdfGenerator(invoice, invoicePath)
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
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  try {
    const invoice = await Invoice.create({
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
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  try {
    let invoice = await Invoice.findByPk(req.params.id, { include: InvoiceItem })
    invoice.firstname = req.body.firstname,
    invoice.lastname = req.body.lastname,
    invoice.company = req.body.company,
    invoice.address = req.body.address,
    invoice.city = req.body.city,
    invoice.paid = req.body.paid,
    invoice.total = req.body.total,
    invoice.payment_date = req.body.payment_date
    invoice.revenuId = req.body.revenuId
    invoice = await invoice.save()
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
    const createInvoiceItemsPromises = [];
    diff.forEach(invoice_item => {
      createInvoiceItemsPromises.push(InvoiceItem.create(invoice_item))
    })
  
    await Promise.all(createInvoiceItemsPromises)
    const updateInvoiceItemsPromises = [];

    included.forEach(invoice_item => {
      InvoiceItem.findByPk(invoice_item.id).then(found_invoice_item => {
        if (invoice_item._destroy) {
          updateInvoiceItemsPromises.push(found_invoice_item.destroy())
        } else {
          found_invoice_item.quantity = invoice_item.quantity,
          found_invoice_item.unit = invoice_item.unit,
          found_invoice_item.total = invoice_item.total
          updateInvoiceItemsPromises.push(found_invoice_item.save())
        }
      })
    })

    await Promise.all(updateInvoiceItemsPromises)
    invoice = await invoice.reload()
    invoice = await invoice.save()
    invoice = await Invoice.findByPk(invoice.id, { include: InvoiceItem })
    res.status(201).json({ message: 'Invoice updated successfully', invoice })
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
    if (!invoice) {
      const error = new Error('Invoice not found.')
      error.statusCode = 404
      next(error)
      await invoice.destroy()
      res.status(200).json({message: 'Invoice successfully destroyed'})
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}