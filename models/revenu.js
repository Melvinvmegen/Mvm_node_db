const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Revenu = sequelize.define('revenu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  pro: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  perso: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
});

module.exports = Revenu;