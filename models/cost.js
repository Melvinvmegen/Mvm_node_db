'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    static associate(models) {
      this.belongsTo(models.Revenu);
    }
  };
  Cost.init({
    name: DataTypes.STRING,
    total: DataTypes.FLOAT,
    tvaAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};