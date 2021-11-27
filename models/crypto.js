'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {}
  Crypto.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    price_purchase: DataTypes.FLOAT,
    price_change: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Crypto'
  });
  return Crypto;
};