'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {
      this.belongsTo(models.Customer);
      this.hasMany(models.InvoiceItem);
    }
  };
  Quotation.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Quotation',
  });
  return Quotation;
};