const Sequelize = require('sequelize');

exports.setFilters = function (queryParams, filteredModel) {
  const Op = Sequelize.Op
  const offset = +queryParams.currentPage > 1 ? (+queryParams.currentPage * +queryParams.perPage) - +queryParams.perPage : 0
  const limit = queryParams.perPage
  const options = {
    limit, 
    offset, 
    where: [],
    distinct: true,
    include: filteredModel,
    order: [
      ['createdAt', 'DESC'],
    ]
  }

  Object.keys(queryParams).forEach(function (key) {
    if (key === 'currentPage' || key === 'perPage') return
    if (key === 'name') {
      options.where.push({[Op.or]: [
        { firstName: {[Op.iLike]: `%${queryParams[key]}%`} },
        { lastName: {[Op.iLike]: `%${queryParams[key]}%`} }
      ]})
    } 
    else if (Number.isInteger(+queryParams[key])) {
      options.where.push({[key]: {[Op.eq]: +queryParams[key]}})
    }
    else {
      options.where.push({[key]: {[Op.iLike]: `%${queryParams[key]}%`}})
    }
  })
  
  return options
}