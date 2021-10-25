'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    static associate(models) {
      this.belongsTo(models.Invoice);
      this.belongsTo(models.Quotation);
    }
  };
  InvoiceItem.init({
    name: DataTypes.STRING,
    unit: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'InvoiceItem',
  });
  return InvoiceItem;
};