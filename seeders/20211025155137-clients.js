'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Jonathan',
      lastName: 'Chaffanjon',
      email: 'platonformation@gmail.com',
      company: 'Platon Formation',
      phone: '0610678331',
      address: "198 chemin de l'abreuvoir",
      city: '07430 Saint Clair',
      siret: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Simon',
      lastName: 'Plinet',
      email: 'Simon.plinet@gmail.com',
      company: 'REFLEX OSTEO',
      phone: '0695028899',
      address: "14 Rue Berjon",
      city: 'Lyon',
      siret: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Matthieu',
      lastName: 'Cartiller',
      email: 'Simon.plinet@gmail.com',
      company: 'Patchouli Franchise LE WAGON',
      phone: '0695028899',
      address: "20 rue des capucins",
      city: 'Lyon',
      siret: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Thomas',
      lastName: 'Roux',
      email: 'Simon.plinet@gmail.com',
      company: 'CMCMRS DISTRIBUTION',
      phone: '0635236650',
      address: "325 Rue saint pierre",
      city: 'Marseille',
      siret: '84060434200021',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Thomas',
      lastName: 'Krief',
      email: 'thomas.krief@gmail.com',
      company: 'THOMAS KRIEF ART',
      phone: '0608955762',
      address: "",
      city: 'Annecy',
      siret: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Claire',
      lastName: 'Coderey',
      email: 'Cdy.claire@hotmail.fr',
      company: 'Roomate',
      phone: '0635594863',
      address: "",
      city: 'Annecy',
      siret: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
