const { validationResult, Result } = require('express-validator')
const Revenu = require('../models/revenu')
const Invoice = require('../models/invoice')
const Credit = require('../models/credit')
const Cost = require('../models/cost')

exports.getRevenus = (req, res, next) => {
  Revenu.findAll()
  .then(revenus => res.status(200).json(revenus))
  .catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  })
}

exports.showRevenu = (req, res, next) => {
  const id = req.params.id
  Revenu.findByPk(id, { include: [Invoice, Credit, Cost] } )
  .then(revenu => {
    if (!revenu) {
      const error = new Error('Revenu not found.')
      error.statusCode = 404
      throw error
    }
    res.status(200).json(revenu)
  })
  .catch(err => console.log(err))
}