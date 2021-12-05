"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.addColumn(
        "Quotations", // name of Source model
        "InvoiceId", // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Invoices", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        { transaction: t }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.removeColumn(
        "Quotations", // name of Source model
        "InvoiceId", // key we want to remove
        { transaction: t }
      );
    });
  },
};
