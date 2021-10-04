const Credit = require('../models/credit')
const { validationResult, Result } = require('express-validator')

exports.createCredit = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  Credit.create({
    reason: req.body.reason,
    total: req.body.total,
    creditor: req.body.creditor,
    revenuId: req.body.revenuId
  })
  .then(credit => {
      res.status(201).json({
        message: 'Credit created successfully',
        credit
      })
    })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.updateCredit = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    next(error)
  }
  Credit.findByPk(req.params.id)
  .then(credit => {
    credit.reason = req.body.reason,
    credit.total = req.body.total,
    credit.creditor = req.body.creditor,
    credit.revenuId = req.body.revenuId
    return credit.save()
  })
  .then(credit => {
    res.status(201).json({
      message: 'Credit updated successfully',
      credit
    })
  })
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.deleteCredit = (req, res, next) => {
  const id = req.params.id
  Credit.findByPk(id)
  .then(credit => {
    if (!credit) {
      const error = new Error('Credit not found.')
      error.statusCode = 404
      next(error)
    }
    return credit.destroy()
  })
  .then(result => res.status(200).json({message: 'Credit successfully destroyed'}))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}