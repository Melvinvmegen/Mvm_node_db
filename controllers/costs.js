const Cost = require('../models/cost')
const { validationResult, Result } = require('express-validator')

exports.createCost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  Cost.create({
    name: req.body.name,
    total: req.body.total,
    revenuId: req.body.revenuId
  })
  .then(cost => {
      res.status(201).json({
        message: 'Cost created successfully',
        cost
      })
    })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.updateCost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  Cost.findByPk(req.params.id)
  .then(cost => {
    cost.name = req.body.name,
    cost.total = req.body.total,
    cost.revenuId = req.body.revenuId
    return cost.save()
  })
  .then(cost => {
    res.status(201).json({
      message: 'Cost updated successfully',
      cost
    })
  })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.deleteCost = (req, res, next) => {
  const id = req.params.id
  Cost.findByPk(id)
  .then(cost => {
    if (!cost) {
      const error = new Error('Cost not found.')
      error.statusCode = 404
      next(error)
    }
    return cost.destroy()
  })
  .then(result => res.status(200).json({message: 'Cost successfully destroyed'}))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}