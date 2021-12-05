'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addColumn(
      'Costs', // name of Source model
      'RevenuId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Revenus', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Costs', // name of Source model
      'RevenuId' // key we want to remove
    )
    await queryInterface.dropTable('Costs');
  }
};