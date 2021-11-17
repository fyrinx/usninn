module.exports = (sequelize, Sequelize) => {
    const BorrowList = sequelize.define("borrowList", {
      toolName: {
        type: Sequelize.STRING
      },
      studentId: {
        type: Sequelize.INTEGER
      },
      toolId: {
        type: Sequelize.INTEGER
      },
      deliveredDate: {
        type: Sequelize.DATE
      },
      deadLineDate: {
        type: Sequelize.DATE
      }
    });
  
    return BorrowList;
  };