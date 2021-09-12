const { validationResult, Result } = require('express-validator')
const Customer = require('../models/customer')

exports.getCustomers = (req, res, next) => {
  Customer.findAll()
  .then(customers => res.status(200).json(customers))
  .catch(error => {
    if (error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.showCustomer = (req, res, next) => {
  const id = req.params.id
  Customer.findByPk(id)
  .then(customer => {
    if (!customer) {
      const error = new Error('Customer not found.')
      error.statusCode = 404
      throw error
    }
    res.status(200).json(customer)
  })
  .catch(error => {
    if (error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.createCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
  }
  Customer.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    siret: req.body.siret
  })
  .then(customer => {
    res.status(201).json({
      message: 'Customer created successfully',
      customer
    })
  })
  .catch(error => {
    if (error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.updateCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
  }
  const id = req.params.id
  Customer.findByPk(id)
    .then(customer => {
      customer.firstname = req.body.firstname,
      customer.lastname = req.body.lastname,
      customer.company = req.body.company,
      customer.email = req.body.email,
      customer.phone = req.body.phone,
      customer.address = req.body.address,
      customer.city = req.body.city,
      customer.siret = req.body.siret
      return customer.save()
    })
  .then(customer => {
    res.status(201).json({
      message: 'Customer updated successfully',
      customer
    })
  })
  .catch(error => {
    if (error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}


exports.deleteCustomer = (req, res, next) => {
  const id = req.params.id
  Customer.findByPk(id)
  .then(customer => {
    if (!customer) {
      const error = new Error('Customer not found.')
      error.statusCode = 404
      throw error
    }
    return customer.destroy()
  })
  .then(result => res.status(200).json({message: 'Customer successfully destroyed'}))
  .catch(error => {
    if (error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}