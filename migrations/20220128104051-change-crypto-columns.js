'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'Cryptos', // name of Source model
          'buyingDate', // name of the key we're adding 
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'Cryptos', // name of Source model
          'fees', // name of the key we're adding 
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'Cryptos', // name of Source model
          'quantityPurchase', // name of the key we're adding 
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Cryptos', // name of Source model
          'category', // name of the key we're adding 
          { 
            type: Sequelize.STRING
          }, { transaction: t }
        ),
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      queryInterface.addColumn(
        'Cryptos', // name of Source model
        'buyingDate', // name of the key we're adding 
        { 
          type: Sequelize.DATE,
        }, { transaction: t }
      ),
      queryInterface.addColumn(
        'Cryptos', // name of Source model
        'fees', // name of the key we're adding 
        { 
          type: Sequelize.FLOAT
        }, { transaction: t }
      ),
      queryInterface.addColumn(
        'Cryptos', // name of Source model
        'quantityPurchase', // name of the key we're adding 
        {
          type: Sequelize.FLOAT
        }, { transaction: t }
      ),
      queryInterface.removeColumn(
        'Cryptos', // name of Source model
        'Category', // name of the key we're adding 
        {
          type: Sequelize.STRING
        }, { transaction: t }
      )
    });
  }
};
