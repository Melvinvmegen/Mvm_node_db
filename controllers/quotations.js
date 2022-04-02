const { validationResult } = require('express-validator')
const { pdfGenerator } = require('../util/pdfGenerator')
const db = require("../models/index");
const { Quotation, Invoice, InvoiceItem } = db
const { setFilters } = require('../util/filter')
const { notFound, validationFailed, alreadyError } = require('../util/errorHandler')
const { updateOrCreateChildItems } = require('../util/childItemsHandler')

exports.getQuotations = async (req, res, next) => {
  const force = (req.query.force === 'true')
  // Force allows filtering by bypassing the cache without invalidating it
  const options = setFilters(req.query, InvoiceItem)

  try {
    const quotations = await getOrSetCache(`quotations_customer_${req.query.CustomerId}`, async () => {
      return await Quotation.findAndCountAll(options)
    }, force)
    res.status(200).json(quotations)
  } catch (error) {
    return next(error)
  }
}

exports.showQuotation = async (req, res, next) => {
  const id = req.params.id
  const isPDF = req.query.pdf

  try {
    const quotation = await Quotation.findByPk(id, { include: InvoiceItem })
    if (!quotation) return notFound(next, 'Quotation')
    if (isPDF) {
      const quotationName = 'quotation-' + quotation.id + '.pdf'

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename="${quotationName}"`)
      let doc = pdfGenerator(quotation)
      doc.pipe(res)
    } else {
      res.status(200).json(quotation)
    }
  } catch (error) {
    return next(error)
  }
}

exports.createQuotation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) validationFailed(next)
  try {
    const quotation =  await Quotation.create(req.body, { include: InvoiceItem })
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`quotations_customer_${quotation.CustomerId}`)
    res.status(201).json({ message: 'Quotation created successfully', quotation })
  } catch (error) {
    return next(error)
  }
}

exports.updateQuotation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationFailed(next)
  try {
    const mutable_invoice_items = req.body.InvoiceItems
    let quotation = await Quotation.findByPk(req.params.id, { include: InvoiceItem })
    if (mutable_invoice_items) await updateOrCreateChildItems(InvoiceItem, quotation.InvoiceItems, req.body.InvoiceItems)

    Object.keys(req.body).forEach((key) => quotation[key] = req.body[key])
    const updatedQuotation = await quotation.save()
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`quotations_customer_${quotation.CustomerId}`)
    res.status(201).json({ message: 'Quotation updated successfully', updatedQuotation })
  } catch (error) {
    return next(error)
  }
}

exports.convertToInvoice = async (req, res, next) => {
  try {
    const quotation = await Quotation.findByPk(req.params.id, { include: InvoiceItem })
    if (!quotation) return notFound(next, 'Quotation')
    if (quotation.InvoiceId) return alreadyError(next, 'Quotation already converted.')
    const quotationValues = Object.fromEntries(Object.entries(quotation.dataValues).filter(([key]) => key !== 'id'))
    const invoice = await Invoice.create(quotationValues, { include: Invoice.InvoiceItems })
    const createInvoiceItemsPromises = [];
    quotation.InvoiceItems.forEach(invoice_item => {
      invoice_item.InvoiceId = invoice.id
      createInvoiceItemsPromises.push(invoice_item.save())
    })
    await Promise.all(createInvoiceItemsPromises)

    quotation.InvoiceId = invoice.id
    await quotation.save()
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache(`quotations_customer_${quotation.CustomerId}`)
    await invalidateCache(`invoices_customer_${invoice.CustomerId}`)
    res.status(200).json({ invoice: invoice, message: 'Quotation successfully converted' }) 
  } catch (error) {
    return next(error)
  }
}

exports.deleteQuotation = async (req, res, next) => {
  const id = req.params.id
  try {
    const quotation = await Quotation.findByPk(id)
    if (!quotation) return notFound(next, 'Quotation')
    await quotation.destroy()
    await invalidateCache(`quotations_customer_${quotation.CustomerId}`)
    res.status(200).json({message: 'Quotation successfully destroyed'})
  } catch (error) {
    return next(error)
  }
}