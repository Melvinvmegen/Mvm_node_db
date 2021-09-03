const { validationResult, Result } = require('express-validator')
const Invoice = require('../models/invoice')

exports.getInvoices = (req, res, next) => {
  Invoice.findAll()
  .then(invoices => res.status(200).json(invoices))
  .catch(err => console.log(err))
}

exports.showInvoice = (req, res, next) => {
  const id = req.params.id
  Invoice.findByPk(id)
  .then(invoice => {
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' })
    }
    res.status(200).json(invoice)
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
  })
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
  const id = req.params.id
  Invoice.findByPk(id)
    .then(invoice => {
      invoice.firstname = req.body.firstname,
      invoice.lastname = req.body.lastname,
      invoice.company = req.body.company,
      invoice.email = req.body.email,
      invoice.phone = req.body.phone,
      invoice.address = req.body.address,
      invoice.city = req.body.city,
      invoice.siret = req.body.siret
      return invoice.save()
    })
  .then(invoice => {
    res.status(201).json({
      message: 'Invoice updated successfully',
      invoice
    })
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