'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Invoices', // name of Source model
          'tvaApplicable', // name of the key we're adding 
          { 
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }, { transaction: t }
        ),
        queryInterface.addColumn(
          'Invoices', // name of Source model
          'totalTTC', // name of the key we're adding 
          { 
            type: Sequelize.FLOAT
          }, { transaction: t }
        ),
        queryInterface.addColumn(
          'Invoices', // name of Source model
          'tvaAmount', // name of the key we're adding 
          { 
            type: Sequelize.FLOAT
          }, { transaction: t }
        ),
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'Invoices', // name of Source model
          'tvaApplicable', // name of the key we're adding 
          { 
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }, { transaction: t }
        ),
        queryInterface.removeColumn(
          'Invoices', // name of Source model
          'totalTTC', // name of the key we're adding 
          { 
            type: Sequelize.FLOAT
          }, { transaction: t }
        ),
        queryInterface.removeColumn(
          'Invoices', // name of Source model
          'tvaAmount', // name of the key we're adding 
          { 
            type: Sequelize.FLOAT
          }, { transaction: t }
        ),
      ])
    });
  }
};
