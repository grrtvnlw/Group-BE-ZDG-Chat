'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      email: 'email@email.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Jane Doe',
      email: 'janesemail@email.com',
      password: 'janespassword',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
