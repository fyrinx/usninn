'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Students",[
  {
    id: 119212209202,
    firstName: "Petter",
    lastName: "Ramde",
    email: "ramde@tull.no",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { id: 119212269202,
    firstName: "Alij",
    lastName: "Lijon",
    email: "lijon@bamse.com",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 119212309282,
    firstName: "Paul",
    lastName: "Farstad",
    email: "farstad@bambi.se",
    createdAt: new Date(),
    updatedAt: new Date()

  },
  {
    id: 119412309252,
    firstName: "Mojtaba",
    lastName: "Afzali",
    email: "afzali@katt.dk",
    createdAt: new Date(),
    updatedAt: new Date()

  },
],{});
  },

  down: async (queryInterface, Sequelize) => {
    
    
    await queryInterface.bulkDelete('Student', null, {});
     
  }
};
