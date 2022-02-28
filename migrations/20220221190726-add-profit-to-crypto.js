'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.addColumn(
        'Cryptos', // name of Source model
        'profit', // name of the key we're adding 
        { 
          type: Sequelize.FLOAT
        }, { transaction: t }
      )
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.removeColumn(
        'Cryptos', // name of Source model
        'profit' // name of the key we're adding 
      )
    });
  }
};
