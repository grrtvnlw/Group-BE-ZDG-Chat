'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Messages', [{
        content: "Did anyone see the updates to JavaScrips .year modes?",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 1,
        UserId: 1
      },{
        content: "Hey! There's a great event at Piedmont Park this weekend.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 3
      },{
        content: "I'm a bird lover, anyone else love birds!",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 5
      },{
        content: "I love birds too! We have a macaw!",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 3
      },{
        content: "I love Piedmont Park! What time is the even?",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 3
      },{
        content: "I saw it's on Saturday starting about 3.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 8
      },{
        content: "Anyone have a good vet they like? We have cats.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 8
      },{
        content: "I'm working on socket.io now! Love it!",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 1,
        UserId: 3
      },{
        content: "How about learning rust? Anyone learning it?",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 1,
        UserId: 5
      },{
        content: "Getting better at Python is a good idea, but let your JavaScript skills get rusty!",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 1,
        UserId: 4
      },{
        content: "I take my cats to Dr. Feelgood on Clairmont Rd.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 3
      },{
        content: "Thanks for the reference.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 2,
        UserId: 8
      },{
        content: "Thanks for the event suggestion. You can park at Grady High School across the street.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 4
      },{
        content: "Yeah! There's also the neighborhood on the other side of the park.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 5
      },{
        content: "Don't forget the Beltline is a great place to ride a bike!",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 8
      },{
        content: "Make sure you are paying  attention to where you are riding though.",
        createdAt: new Date(),
        updatedAt: new Date(),
        RoomId: 3,
        UserId: 4
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
