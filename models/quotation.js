'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {
      this.belongsTo(models.Revenu);
      this.belongsTo(models.Customer);
      this.belongsTo(models.Invoice);
      this.hasMany(models.InvoiceItem);
    }
  };
  Quotation.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    total: DataTypes.FLOAT,
    cautionPaid: DataTypes.BOOLEAN,
    tvaApplicable: DataTypes.BOOLEAN,
    totalTTC: DataTypes.FLOAT,
    tvaAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Quotation',
  });
  return Quotation;
};