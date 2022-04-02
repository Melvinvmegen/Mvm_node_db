const Sequelize = require('sequelize');
const db = require("../models/index");
const { Revenu, Invoice, Credit, Cost, Quotation, Transaction } = db
const { updateOrCreateChildItems } = require('../util/childItemsHandler')
const { getOrSetCache } = require('../util/cacheManager')

exports.getRevenus = async (req, res, next) => {
  const force = (req.query.force === 'true'),
        Op = Sequelize.Op,
        queryParams = req.query,
        offset = +queryParams.currentPage > 1 ? (+queryParams.currentPage * +queryParams.perPage) - +queryParams.perPage : 0,
        limit = queryParams.perPage,
        options = { 
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
    const arrDate = queryParams.month.split('/'),
          year = arrDate[1],
          month = arrDate[0] - 1,
          firstDay = new Date(+year, +month),
          lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
  
    options.where.push( { 
      createdAt: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay
      } 
    })
  }

  try {
    const revenus = await getOrSetCache('revenus', async () => {
      return await Revenu.findAndCountAll(options)
    }, force)
    res.status(200).json(revenus)
  } catch (error) {
    return next(error)
  }
}

exports.showRevenu = async (req, res, next) => {
  try {
    const id = req.params.id
    const revenu = await getOrSetCache(`revenu_${id}`, async () => {
      const data = await Revenu.findByPk(id, { include: [Invoice, Credit, Cost, Quotation, Transaction] } )
      if (!data) return notFound(next, 'Customer')
      return data
    })
    res.status(200).json(revenu)
  } catch (error) {
    return next(error)
  }
}

exports.updateRevenu = async (req, res, next) => {
  try {
    let revenu = await Revenu.findByPk(req.params.id, { include: [Credit, Cost, Invoice, Quotation] })
    const mutable_credits = req.body.Credits
    const mutable_costs = req.body.Costs
    if (mutable_credits) await updateOrCreateChildItems(Credit, revenu.Credits, mutable_credits)
    if (mutable_costs) await updateOrCreateChildItems(Cost, revenu.Costs, mutable_costs)

    let revenu_total = 0
    let revenu_pro = 0
    let revenu_perso = 0

    if (revenu.Invoices) revenu.Invoices.forEach(invoice => revenu_pro += invoice.total)
    if (revenu.Quotations) revenu.Quotations.forEach(quotation => revenu_pro += quotation.total * 0.3)
    if (revenu.Credits) revenu.Credits.forEach(credit => revenu_perso += credit.total)

    Object.keys(req.body).forEach((key) => revenu[key] = req.body[key])
    revenu_total = revenu_pro + revenu_perso
    revenu.pro = revenu_pro
    revenu.perso = revenu_perso
    revenu.total = revenu_total;
    revenu.taxPercentage = req.body.taxPercentage
    await revenu.save()
    await revenu.reload()

    // Invalidate the cache every time we change something so that the front is always up to date
    await invalidateCache('revenus')
    await invalidateCache(`revenu_${revenu.id}`)
    res.status(201).json({ message: 'Revenu updated successfully', revenu })
  } catch (error) {
    return next(error)
  }
}
