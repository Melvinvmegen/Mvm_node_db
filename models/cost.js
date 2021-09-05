const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cost = sequelize.define('cost', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
});

module.exports = Cost;