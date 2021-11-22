Tools=require("./tools.model.js");
Student=require("./student.model.js");
module.exports = (sequelize, Sequelize) => {
    const BorrowList = sequelize.define("borrowList", {
      toolName: {
        type: Sequelize.STRING,
        references: { 
            model: Tools,
            key: 'toolName' 
        }
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { 
            model: Student,
            key: 'id' 
        }
      },
      toolId: {
        type: Sequelize.INTEGER,
        references: { 
            model: Tools,
            key: 'id' 
        }
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