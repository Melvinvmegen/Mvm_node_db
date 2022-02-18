const { validationResult } = require('express-validator')
const db = require("../models/index");
const { Customer, Invoice } = db
const { setFilters } = require('../util/filter')
const { notFound, validationFailed } = require('../util/errorHandler')

exports.getCustomers = async (req, res, next) => {
  const options = setFilters(req.query, Invoice)

  try {
    const customers = await Customer.findAndCountAll(options)
    res.status(200).json(customers)

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id)
    if (!customer) {
      notFound(next, 'Customer')
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
  if (!errors.isEmpty()) validationFailed(next)
  try {
    const customer = await Customer.create(req.body)
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
  if (!errors.isEmpty()) validationFailed(next)
  try {
    let customer = await Customer.findByPk(req.params.id)
    Object.keys(req.body).forEach((key) => customer[key] = req.body[key])
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
  try {
    const customer = await Customer.findByPk(req.params.id)
    if (!customer) {
      notFound(next, 'Customer')
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