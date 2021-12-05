"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      this.belongsTo(models.Revenu);
      this.belongsTo(models.Customer);
      this.hasMany(models.InvoiceItem);
      this.hasOne(models.Quotation);
    }
  }
  Invoice.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      company: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      total: DataTypes.FLOAT,
      paid: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
