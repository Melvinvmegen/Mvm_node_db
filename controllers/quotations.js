const { validationResult, Result } = require('express-validator')
const Quotation = require('../models/quotation')
const Invoice = require('../models/invoice')
const InvoiceItem = require('../models/invoiceItem')
const { pdfGenerator } = require('../util/pdfGenerator')
const Sequelize = require('sequelize')
const path = require('path')

exports.getQuotations = async (req, res, next) => {
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
    const quotations = await Quotation.findAndCountAll(options)
    res.status(200).json(quotations)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showQuotation = async (req, res, next) => {
  const id = req.params.id
  const isPDF = req.query.pdf

  try {
    const quotation = await Quotation.findByPk(id, { include: InvoiceItem })
    if (!quotation) {
      const error = new Error('Quotation not found.')
      error.statusCode = 404
      next(error)
    }
    if (isPDF) {
      const quotationName = 'quotation-' + quotation.id + '.pdf'
      const quotationPath = path.join('data', 'quotations', quotationName)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename="${quotationName}"`)
      let doc = pdfGenerator(quotation, quotationPath)
      doc.pipe(res)
    } else {
      res.status(200).json(quotation)
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.createQuotation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    console.log(error)
    error.statusCode = 422
    return next(error)
  }
  try {
    const quotation =  await Quotation.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      company: req.body.company,
      address: req.body.address,
      city: req.body.city,
      total: req.body.total,
      customerId: req.body.customerId,
      invoiceItems: req.body.invoice_items
    }, { include: Quotation.InvoiceItems })
    res.status(201).json({ message: 'Quotation created successfully', quotation })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.updateQuotation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    return next(error)
  }
  try {
    let quotation = await Quotation.findByPk(req.params.id, { include: InvoiceItem })
    quotation.firstname = req.body.firstname,
    quotation.lastname = req.body.lastname,
    quotation.company = req.body.company,
    quotation.address = req.body.address,
    quotation.city = req.body.city,
    quotation.total = req.body.total,
    quotation = await quotation.save()
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
    quotation = await quotation.reload()
    quotation = await quotation.save()
    quotation = await Quotation.findByPk(quotation.id, { include: InvoiceItem })
    res.status(201).json({ message: 'Quotation updated successfully', quotation })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.convertToInvoice = (req, res, next) => {
  const id = req.params.id
  Quotation.findByPk(id, { include: InvoiceItem })
  .then(quotation => {
    if (!quotation) {
      const error = new Error('Quotation not found.')
      error.statusCode = 404
      next(error)
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
      next(error)
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