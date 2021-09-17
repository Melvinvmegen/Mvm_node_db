const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Quotation = sequelize.define('quotation', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  company: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});

Quotation.addHook('beforeSave', (quotation, options) => {
  let quotation_total = 0;
  if (quotation.invoiceItems) {
    quotation.invoiceItems.forEach(invoice_item => {
      quotation_total += invoice_item.total
    }); 
  }

  quotation.total = quotation_total;
});

module.exports = Quotation;