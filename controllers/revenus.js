const Sequelize = require('sequelize');
const db = require("../models/index");
const { Revenu, Invoice, Credit, Cost, Quotation, Transaction } = db
const { updateOrCreateChildItems } = require('../util/childItemsHandler')

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
  try {
    let revenu = await Revenu.findByPk(req.params.id, { include: [Credit, Cost, Invoice, Quotation] })
    const mutable_credits = req.body.Credits
    const mutable_costs = req.body.Costs
    if (mutable_credits) await updateOrCreateChildItems(Credit, revenu.Credits, mutable_credits)
    if (mutable_costs) await updateOrCreateChildItems(Cost, revenu.Costs, mutable_costs)
  
    revenu = await revenu.reload()
    revenu = await revenu.save()
    revenu = await Revenu.findByPk(revenu.id, { include: [Credit, Cost, Invoice, Quotation] })

    let revenu_total = 0
    let revenu_pro = 0
    let revenu_perso = 0

    if (revenu.Invoices) revenu.Invoices.forEach(invoice => revenu_pro += invoice.total)
    if (revenu.Quotations) revenu.Quotations.forEach(quotation => revenu_pro += quotation.total * 0.3)
    if (revenu.Credits) revenu.Credits.forEach(credit => revenu_perso += credit.total)

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
  const revenu = await Revenu.findByPk(req.params.id, { include: [Invoice, Credit, Cost, Quotation, Transaction] } )
  try {
    res.status(200).json(revenu)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}