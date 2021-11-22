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
     await queryInterface.bulkInsert("Tools",[
      {
        toolName: "Raspberry Pi",
        toolsIn: 3,
        toolsTotal: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        toolName: "Arduino UNO",
        toolsIn: 5,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        toolName: "Arduino Mega",
        toolsIn: 2,
        toolsTotal: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        toolName: "Dildo",
        toolsIn: 5,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],{});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
