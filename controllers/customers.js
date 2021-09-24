const { validationResult, Result } = require('express-validator')
const Customer = require('../models/customer')
const Sequelize = require('sequelize')

exports.getCustomers = (req, res, next) => {
  const Op = Sequelize.Op
  const queryParams = req.query

  const options = {
    where: []
  }

  if (queryParams.name) {
    options.where.push({[Op.or]: [
      { firstname: {[Op.iLike]: `%${queryParams.name}%`} },
      { lastname: {[Op.iLike]: `%${queryParams.name}%`} }
    ]})
  }

  if (queryParams.email) {
    options.where.push({email: {[Op.iLike]: `%${queryParams.email}%`}})
  }

  if (queryParams.city) {
    options.where.push({city: {[Op.iLike]: `%${queryParams.city}%`}})
  }

  if (queryParams.phone) {
    options.where.push({phone: {[Op.iLike]: `%${queryParams.phone}%`}})
  }

  Customer.findAll(options)
  .then(customers => {
    console.log(customers)
    res.status(200).json(customers)
  })
  .catch(error => {
    if (!error.statusCode) {
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
    if (!error.statusCode) {
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
    if (!error.statusCode) {
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
    if (!error.statusCode) {
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
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}