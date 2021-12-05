'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.FLOAT
      },
      paid: {
        type: Sequelize.BOOLEAN
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
      'Invoices', // name of Source model
      'CustomerId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'Invoices', // name of Source model
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
      'Invoices', // name of Source model
      'CustomerId' // key we want to remove
    );
    await queryInterface.removeColumn(
      'Invoices', // name of Source model
      'RevenuId' // key we want to remove
    );
    await queryInterface.dropTable('Invoices');
  }
};