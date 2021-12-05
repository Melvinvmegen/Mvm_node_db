'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('password', 12)
    await queryInterface.bulkInsert('Users', [{
      email: 'melvin.vmegen@gmail.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
