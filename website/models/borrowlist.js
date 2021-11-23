'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BorrowList.belongsTo(models.Student, {
        foreignKey: "studentId",
        as: "student"
      });
      BorrowList.hasOne(models.Tool,{
        foreignKey: "id",
        as: "Tool"
      });
    }
  };
  BorrowList.init({
    toolName: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    toolId: DataTypes.INTEGER,
    deliveredDate: DataTypes.DATE,
    deadlineDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BorrowList',
  });
  return BorrowList;
};