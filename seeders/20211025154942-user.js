'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'melvin.vmegen@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
