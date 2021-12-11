'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BorrowLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      toolName: {
        type: Sequelize.STRING
      },
      studentId: {
        type: Sequelize.BIGINT
      },
      toolId: {
        type: Sequelize.INTEGER
      },
      deliveredDate: {
        type: Sequelize.DATE
      },
      deadlineDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BorrowLists');
  }
};