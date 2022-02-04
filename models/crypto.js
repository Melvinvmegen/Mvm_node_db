'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {
    static associate(models) {
      this.hasMany(models.Transaction);
    }
  }
  Crypto.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    pricePurchase: DataTypes.FLOAT,
    priceChange: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Crypto'
  });
  return Crypto;
};