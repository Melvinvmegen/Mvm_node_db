'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Credits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creditor: {
        type: Sequelize.STRING
      },
      reason: {
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
      'Credits', // name of Source model
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
      'Credits', // name of Source model
      'RevenuId' // key we want to remove
    );
    await queryInterface.dropTable('Credits');
  }
};