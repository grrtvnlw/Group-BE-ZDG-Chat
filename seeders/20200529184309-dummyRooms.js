'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rooms', [{
        rm_name: 'Ocean Room',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rm_name: 'Space Room',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rm_name: 'Welcome to the Jungle',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
