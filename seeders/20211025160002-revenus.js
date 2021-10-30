'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("12/01/2019"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("01/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("02/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("03/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("04/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("05/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("06/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("07/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("08/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("09/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("10/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("11/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("12/01/2020"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("01/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("02/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("03/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("04/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("05/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("06/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("07/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("08/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("09/01/2021"),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Revenus', [{
      total: '0',
      pro: '0',
      perso: '0',
      createdAt: new Date("10/01/2021"),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Revenus', null, {});
  }
};
