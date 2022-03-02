const { validationResult } = require('express-validator')
const db = require("../models/index");
const { Customer, Invoice } = db
const { setFilters } = require('../util/filter')
const { notFound, validationFailed } = require('../util/errorHandler')
const { getOrSetCache } = require('../util/cacheManager')

exports.getCustomers = async (req, res, next) => {
  const options = setFilters(req.query, Invoice)
  // Force allows filtering by bypassing the cache without invalidating it
  const force = (req.query.force === 'true')
  try {
    const customers = await getOrSetCache('customers', async () => {
      return await Customer.findAndCountAll(options)
    }, force)
    return res.status(200).json(customers)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showCustomer = async (req, res, next) => {
  try {
    const id = req.params.id
    const customer = await getOrSetCache(`customer_${id}`, async () => {
      const data = await Customer.findByPk(id)
      if (!data) return notFound(next, 'Customer')
      return data
    })

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
  if (!errors.isEmpty()) return validationFailed(next)
  try {
    const customer = await Customer.create(req.body)
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache('customers')
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
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache('customers')
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
    if (!customer) return notFound(next, 'Customer')
    await customer.destroy()
    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache('customers')
    res.status(200).json({message: 'Customer successfully destroyed'})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}