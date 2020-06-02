'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rooms', [{
        rm_name: 'Coding Room',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rm_name: 'Pets Room',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rm_name: 'Atlanta Room',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
