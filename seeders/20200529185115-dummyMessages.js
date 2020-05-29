'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Messages', [{
        content: 'loremipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 1,
        UserId: 1
      }, {
        content: 'moreloremipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 2
      }, {
        content: 'evenmoreloremipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 2
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
