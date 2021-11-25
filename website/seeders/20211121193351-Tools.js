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
        updatedAt: new Date(),
        description: "En liten datamaskin"
      },
      {
        toolName: "Arduino UNO",
        toolsIn: 5,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En liten mikrokontroller"
      },
      {
        toolName: "Arduino Mega",
        toolsIn: 2,
        toolsTotal: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En større mikrokontroller"
      },
      {
        toolName: "Dildo",
        toolsIn: 5,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En snasen sak man har på lur. ;)"
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
