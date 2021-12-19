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
        id:14015625556,
        toolName: "Raspberry Pi",
        toolsIn: 2,
        toolsTotal: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En liten datamaskin"
      },
      {
        id:14015624555,
        toolName: "Arduino UNO",
        toolsIn: 2,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En liten mikrokontroller"
      },
      {
        id:14015624556,
        toolName: "Arduino Mega",
        toolsIn: 2,
        toolsTotal: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En større mikrokontroller"
      },
      {
        id:14015624558,
        toolName: "Hammer",
        toolsIn: 4,
        toolsTotal: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "En snasen sak man har på lur."
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
