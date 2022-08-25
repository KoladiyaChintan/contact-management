'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('userRegister', [{
        id:"717944ca-4f36-4e0b-9013-384ccf957a10",
        name:"chintan4471",
        email:"koladiyachintan5990@gmail.com",
        password:"Chintan1@",
        avtar:"abc.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userRegister', null, {});
    
  }
};
