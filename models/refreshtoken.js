'use strict';
const { Model} = require('sequelize');
const { v4: uuidv4 } = require("uuid");
const config = require("../config/auth.config.js");

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static async createToken(user) {
      let expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration)

      let _token = uuidv4();
      let refreshToken = await this.create({
        token: _token,
        userId: user.id,
        expiryDate: expiredAt.getTime(),
      });

      return refreshToken.token;
    }

    static async verifyExpiration(token) {
      return token.expiryDate.getTime() < new Date().getTime();
    }

    static associate(models) {
      this.belongsTo(models.User);
    }
  }

  RefreshToken.init({
    token: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RefreshToken',
  })

  return RefreshToken;
};