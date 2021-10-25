'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Credit extends Model {
    static associate(models) {
      this.belongsTo(models.Revenu);
    }
  };
  Credit.init({
    creditor: DataTypes.STRING,
    reason: DataTypes.STRING,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Credit',
  });
  return Credit;
};