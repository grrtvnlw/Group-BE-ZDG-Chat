'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'gerrit',
      email: 'gerrit@gerrit.com',
      password: '$2b$10$MDziCIDCDownnr30uvX32eSmufqEyy1Ho1GORww0gwodBSn36Q78i',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'zahria',
      email: 'zahria@zahria.com',
      password: '$2b$10$KZfGgDQAaeLqq6TnvJUJeupYOkSQX1594GHa4270etE..bIpvvxpW',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'david',
      email: 'david@david.com.com',
      password: '$2b$10$T9bomkROg6cIFL/e5ycJguiFmiVS17.cOcKVjvwkeO4oMpgPEeWta',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'joe',
      email: 'joe@joe.com',
      password: '$2b$10$hEodGD8vm/W9t4nkIScP0u24dayYsC2HUwDbdw.6Lch5gADJj4mTC',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'wes',
      email: 'wes@wes.com',
      password: '$2b$10$TP5eKscXR2s//HF4gtb0Ou9LFZY6B4bPkR0huGD1OBg3e1CKD3s3K',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'lachlan',
      email: 'lachlan@lachlan.com',
      password: '$2b$10$ogM3N1Jd1wI4K9pZA/u6ZOrIhaGtTwpOMhEFv6GuZQqHDPxK86x1C',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'chris',
      email: 'chris@chris.com',
      password: '$2b$10$DBsWbLMfPplwDcu2OFzNvO9s/gnipmGCXM8JkEVjcf4rxVMLaSaRO',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'bob',
      email: 'bob@bob.com',
      password: '$2b$10$Z.nwXoRFM9H0bN2CI/xb7e1Hx5fIO9qvZNzCC6gsJmc405ElnSTcC',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
     {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
