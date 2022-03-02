'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.addColumn(
        'Quotations', // name of Source model
        'paymentDate', // name of the key we're adding 
        { 
          type: Sequelize.DATE
        }, { transaction: t }
      )
    });
  },

  down: async ({ context: queryInterface }) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.removeColumn(
        'Quotations', // name of Source model
        'paymentDate' // name of the key we're adding 
      )
    });
  }
};
