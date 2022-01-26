'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Costs', // name of Source model
          'tvaAmount', // name of the key we're adding 
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
        'Costs', // name of Source model
        'tvaAmount', // name of the key we're adding 
        { 
          type: Sequelize.FLOAT
        }, { transaction: t }
      )
    });
  }
};
