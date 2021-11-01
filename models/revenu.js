'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Revenu extends Model {
    static associate(models) {
      this.hasMany(models.Invoice);
      this.hasMany(models.Cost);
      this.hasMany(models.Credit);
      this.hasMany(models.Quotation);
    }
  };
  Revenu.init({
    total: DataTypes.FLOAT,
    pro: DataTypes.FLOAT,
    perso: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Revenu',
  });
  return Revenu;
};