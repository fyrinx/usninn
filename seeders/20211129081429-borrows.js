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
   var date=Date.parse("2022-3-14T22:59:59.000Z");
   await queryInterface.bulkInsert('BorrowLists',[
     {
      studentId: 119212209202,
      toolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineDate: new Date('2022-3-14 22:59:59')
      },
    {
      studentId: 119212269202,
      toolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineDate: new Date('2022-3-14 22:59:59')
  
    },
    {
      studentId: 119212309282,
      toolId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineDate: new Date('2022-3-14 22:59:59')
  
    },
    {
      studentId: 119212269202,
      toolId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineDate: new Date('2022-3-14 22:59:59')
  
    },
    {
      studentId: 119212269202,
      toolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineDate: new Date('2022-3-14 22:59:59')
  
    },
  ])
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
