const Credit = require('../models/credit')
const { validationResult, Result } = require('express-validator')

exports.createCredit = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}

exports.updateCredit = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}

exports.deleteCredit = (req, res, next) => {
  const id = req.params.id
  Credit.findByPk(id)
  .then(credit => {
    if (!credit) {
      res.status(404).json({ message: 'Credit not found' })
    }
    return credit.destroy()
  })
  .then(result => res.status(200).json({message: 'Credit successfully destroyed'}))
  .catch(err => console.log(err))
}