const { validationResult, Result } = require('express-validator')
const Customer = require('../models/customer')

exports.getCustomers = (req, res, next) => {
  Customer.findAll()
  .then(customers => res.status(200).json(customers))
  .catch(err => console.log(err))
}

exports.showCustomer = (req, res, next) => {
  const id = req.params.id
  Customer.findByPk(id)
  .then(customer => {
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json(customer)
  })
  .catch(err => console.log(err))
}

exports.createCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}

exports.updateCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}


exports.deleteCustomer = (req, res, next) => {
  const id = req.params.id
  Customer.findByPk(id)
  .then(customer => {
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
    }
    return customer.destroy()
  })
  .then(result => res.status(200).json({message: 'Customer successfully destroyed'}))
  .catch(err => console.log(err))
}