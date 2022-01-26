'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Revenus', // name of Source model
          'taxPercentage', // name of the key we're adding 
          { 
            type: Sequelize.FLOAT
          }, { transaction: t }
        )
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      queryInterface.removeColumn(
        'Revenus', // name of Source model
        'taxPercentage', // name of the key we're adding 
        { 
          type: Sequelize.FLOAT
        }, { transaction: t }
      )
    });
  }
};
