const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Invoice = sequelize.define('invoice', {
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
  payment_date: Sequelize.DATE,
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Invoice.addHook('beforeSave', (invoice, options) => {
  let invoice_total = 0;
  if (invoice.invoiceItems) {
    invoice.invoiceItems.forEach(invoice_item => {
      invoice_total += invoice_item.total
    }); 
  }

  invoice.total = invoice_total;
});

module.exports = Invoice;