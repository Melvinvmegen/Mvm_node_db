'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      quantity: {
        type: Sequelize.FLOAT
      },
      exchange: {
        type: Sequelize.STRING
      },
      buyingDate: {
        type: Sequelize.DATE
      },
      fees: {
        type: Sequelize.FLOAT
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
    })
    await queryInterface.addColumn(
      'Transactions', // name of Source model
      'CryptoId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cryptos', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'Transactions', // name of Source model
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
      'Transactions', // name of Source model
      'CryptoId' // key we want to remove
    )
    await queryInterface.removeColumn(
      'Transactions', // name of Source model
      'RevenuId' // key we want to remove
    )
    await queryInterface.dropTable('Transactions');
  }
};