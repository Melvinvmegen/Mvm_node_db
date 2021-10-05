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

module.exports = Invoice;