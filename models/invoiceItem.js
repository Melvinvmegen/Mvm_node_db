const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const InvoiceItem = sequelize.define('invoice_item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  unit: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  name: Sequelize.STRING
});

module.exports = InvoiceItem;