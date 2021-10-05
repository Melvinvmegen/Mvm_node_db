const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Credit = sequelize.define('credit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  reason: Sequelize.STRING,
  creditor: Sequelize.STRING,
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
});

module.exports = Credit;