const { validationResult, Result } = require('express-validator')
const Customer = require('../models/customer')
const Sequelize = require('sequelize')

exports.getCustomers = (req, res, next) => {
  const Op = Sequelize.Op
  const queryParams = req.query
  const offset = +queryParams.currentPage > 1 ? (+queryParams.currentPage * +queryParams.perPage) - +queryParams.perPage : 0
  const limit = queryParams.perPage
  const options = { limit, offset, where: [] }

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

  try {
    const customers = Customer.findAndCountAll(options)
    res.status(200).json(customers)

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showCustomer = async (req, res, next) => {
  const id = req.params.id
  try {
    const customer = await Customer.findByPk(id)
    if (!customer) {
      const error = new Error('Customer not found.')
      error.statusCode = 404
      next(error)
    }
    res.status(200).json(customer)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.createCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  try {
    const customer = await Customer.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      siret: req.body.siret
    })
    res.status(201).json({ message: 'Customer created successfully', customer })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.updateCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  const id = req.params.id
  try {
    let customer = await Customer.findByPk(id)
    customer.firstname = req.body.firstname,
    customer.lastname = req.body.lastname,
    customer.company = req.body.company,
    customer.email = req.body.email,
    customer.phone = req.body.phone,
    customer.address = req.body.address,
    customer.city = req.body.city,
    customer.siret = req.body.siret
    customer = await customer.save()
    res.status(201).json({ message: 'Customer updated successfully', customer })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}


exports.deleteCustomer = async (req, res, next) => {
  const id = req.params.id
  try {
    const customer = await Customer.findByPk(id)
    if (!customer) {
      const error = new Error('Customer not found.')
      error.statusCode = 404
      next(error)
    }
    await customer.destroy()
    res.status(200).json({message: 'Customer successfully destroyed'})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}