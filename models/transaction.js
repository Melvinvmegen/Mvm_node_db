'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Crypto);
      this.belongsTo(models.Revenu);
    }
  }
  Transaction.init({
    buyingDate: DataTypes.DATE,
    exchange: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT,
    fees: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Transaction'
  });
  return Transaction;
};