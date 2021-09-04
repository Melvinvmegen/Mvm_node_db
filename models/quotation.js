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

module.exports = Quotation;