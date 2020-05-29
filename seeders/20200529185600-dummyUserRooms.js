'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserRooms', [{
        UserID: 1,
        RoomID: 1
      }, {
        UserID: 2,
        RoomID: 1
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRooms', null, {});
  }
};
