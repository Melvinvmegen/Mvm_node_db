const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  company: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  siret: Sequelize.STRING
});

module.exports = Customer;