const { validationResult, Result } = require('express-validator')
const Revenu = require('../models/revenu')
const Invoice = require('../models/invoice')
const Credit = require('../models/credit')

exports.getRevenus = (req, res, next) => {
  Revenu.findAll()
  .then(revenus => res.status(200).json(revenus))
  .catch(err => console.log(err))
}

exports.showRevenu = (req, res, next) => {
  const id = req.params.id
  Revenu.findByPk(id, { include: Invoice, Credit } )
  .then(revenu => {
    if (!revenu) {
      res.status(404).json({ message: 'Revenu not found' })
    }
    res.status(200).json(revenu)
  })
  .catch(err => console.log(err))
}