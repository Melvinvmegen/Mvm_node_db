const Cost = require('../models/cost')
const { validationResult, Result } = require('express-validator')

exports.createCost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}

exports.updateCost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({message: 'Vaidation failed', errors: errors.array()})
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
  .catch(err => console.log(err))
}

exports.deleteCost = (req, res, next) => {
  const id = req.params.id
  Cost.findByPk(id)
  .then(cost => {
    if (!cost) {
      res.status(404).json({ message: 'Cost not found' })
    }
    return cost.destroy()
  })
  .then(result => res.status(200).json({message: 'Cost successfully destroyed'}))
  .catch(err => console.log(err))
}