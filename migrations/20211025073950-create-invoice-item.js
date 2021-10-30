'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.FLOAT
      },
      quantity: {
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
    });
    await queryInterface.addColumn(
      'InvoiceItems', // name of Source model
      'InvoiceId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Invoices', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'InvoiceItems', // name of Source model
      'QuotationId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Quotations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'InvoiceItems', // name of Source model
      'InvoiceId' // key we want to remove
    );
    await queryInterface.removeColumn(
      'InvoiceItems', // name of Source model
      'QuotationId' // key we want to remove
    )
    await queryInterface.dropTable('InvoiceItems');
  }
};