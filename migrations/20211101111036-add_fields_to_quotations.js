'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Quotations', // name of Source model
          'RevenuId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Revenus', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }, { transaction: t }
        ),
        queryInterface.addColumn(
          'Quotations', // name of Source model
          'cautionPaid', // name of the key we're adding 
          { 
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }, { transaction: t }
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          'Quotations', // name of Source model
          'RevenuId', // key we want to remove
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'Quotations', // name of Source model
          'cautionPaid', // key we want to remove
          { transaction: t }
        )
      ])
    })
  }
};
