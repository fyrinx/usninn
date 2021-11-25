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
      // BorrowList.belongsTo(models.Student, {
      //   foreignKey: "studentId",
      // });
      // BorrowList.hasOne(models.Tool,{
      //   foreignKey: "id",
      // });
    }
  };
  BorrowList.init({
    studentId: DataTypes.INTEGER,
    toolId: DataTypes.INTEGER,
    itemCount: DataTypes.INTEGER,
    deliveredDate: DataTypes.DATE,
    deadlineDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BorrowList',
  });
  return BorrowList;
};