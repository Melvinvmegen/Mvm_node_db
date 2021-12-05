'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {}
  Crypto.init({
    buyingDate: DataTypes.DATE,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    pricePurchase: DataTypes.FLOAT,
    quantityPurchase: DataTypes.FLOAT,
    priceChange: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Crypto'
  });
  return Crypto;
};