const { validationResult, Result } = require('express-validator')
const Sequelize = require('sequelize');
const db = require("../models/index");
const { Revenu, Invoice, Credit, Cost, Quotation, Transaction } = db

exports.getRevenus = async (req, res, next) => {
  const Op = Sequelize.Op
  const queryParams = req.query
  const offset = +queryParams.currentPage > 1 ? (+queryParams.currentPage * +queryParams.perPage) - +queryParams.perPage : 0
  const limit = queryParams.perPage
  const options = { 
    limit, 
    offset, 
    where: [],
    distinct: true,
    include: [Invoice, Credit, Cost, Quotation, Transaction],
    order: [
      ['createdAt', 'DESC'],
    ]
  }

  if (queryParams.month) {
    const arrDate = queryParams.month.split('/')
    const year = arrDate[1]
    const month = arrDate[0] - 1
    const firstDay = new Date(+year, +month)
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
  
    options.where.push( { 
      createdAt: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay
      } 
    })
  }

  try {
    const revenus = await Revenu.findAndCountAll(options)
    res.status(200).json(revenus)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.updateRevenu = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    return next(error)
  }
  try {
    let revenu = await Revenu.findByPk(req.params.id, { include: [Credit, Cost, Invoice, Quotation] })
    const all_credits = revenu.Credits
    const mutable_credits = req.body.credits
    if (mutable_credits) {
      const diff_credits = mutable_credits.filter(function(mutable_credit) {
        return !all_credits.some(function(initial_credit) {
          return initial_credit.id == mutable_credit.id
        })
      })
      const included_credits = mutable_credits.filter(function(mutable_credit) {
        return all_credits.some(function(initial_credit) {
          return initial_credit.id == mutable_credit.id
        })
      })
      const createCreditsPromises = [];
      diff_credits.forEach(credit => {
        createCreditsPromises.push(Credit.create(credit))
      })
      await Promise.all(createCreditsPromises)
      const updateCreditsPromises = [];
  
      included_credits.forEach(credit => {
        Credit.findByPk(credit.id).then(found_credit => {
          if (credit._destroy) {
            updateCreditsPromises.push(found_credit.destroy())
          } else {
            found_credit.reason = credit.reason,
            found_credit.creditor = credit.creditor,
            found_credit.total = credit.total
            updateCreditsPromises.push(found_credit.save())
          }
        })
      })
      await Promise.all(updateCreditsPromises)
    }
    const all_costs = revenu.Costs
    const mutable_costs = req.body.costs

    if (mutable_costs) {
      const diff_costs = mutable_costs.filter(function(mutable_cost) {
        return !all_costs.some(function(initial_cost) {
          return initial_cost.id == mutable_cost.id
        })
      })
      const included_costs = mutable_costs.filter(function(mutable_cost) {
        return all_costs.some(function(initial_cost) {
          return initial_cost.id == mutable_cost.id
        })
      })
      const createCostsPromises = [];
      diff_costs.forEach(cost => {
        createCostsPromises.push(Cost.create(cost))
      })
      await Promise.all(createCostsPromises)
      const updateCostsPromises = [];
  
      included_costs.forEach(cost => {
        Cost.findByPk(cost.id).then(found_cost => {
          if (cost._destroy) {
            updateCostsPromises.push(found_cost.destroy())
          } else {
            found_cost.name = cost.name,
            found_cost.total = cost.total
            found_cost.tvaAmount = cost.tvaAmount
            updateCostsPromises.push(found_cost.save())
          }
        })
      })
      await Promise.all(updateCostsPromises)
    }

    revenu = await revenu.reload()
    revenu = await revenu.save()
    revenu = await Revenu.findByPk(revenu.id, { include: [Credit, Cost, Invoice, Quotation] })
    let revenu_total = 0
    let revenu_pro = 0
    let revenu_perso = 0
    if (revenu.Invoices) {
      revenu.Invoices.forEach(invoice => {
        revenu_pro += invoice.total
      }); 
    }
    if (revenu.Quotations) {
      revenu.Quotations.forEach(quotation => {
        revenu_pro += quotation.total*0.3
      }); 
    }
    if (revenu.Credits) {
      revenu.Credits.forEach(credit => revenu_perso += credit.total); 
    }
    revenu_total = revenu_pro + revenu_perso
    revenu.pro = revenu_pro
    revenu.perso = revenu_perso
    revenu.total = revenu_total;
    revenu.taxPercentage = req.body.taxPercentage
    revenu = await revenu.save()
    res.status(201).json({ message: 'Revenu updated successfully', revenu })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

exports.showRevenu = async (req, res, next) => {
  const id = req.params.id,
  revenu = await Revenu.findByPk(id, { include: [Invoice, Credit, Cost, Quotation, Transaction] } )
  try {
    res.status(200).json(revenu)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}