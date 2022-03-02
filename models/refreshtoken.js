'use strict';
const { Model} = require('sequelize');
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static async createToken(user) {
      let expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + +process.env.JWT_REFRESH_EXPIRATION)

      let _token = uuidv4();
      let refreshToken = await this.create({
        token: _token,
        UserId: user.id,
        expiryDate: expiredAt.getTime(),
      });

      return refreshToken.token;
    }

    static verifyExpiration(token) {
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