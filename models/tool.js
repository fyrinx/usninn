'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tool.hasOne(models.BorrowList,{
        foreignKey:'toolId'
      });
    }
  };
  Tool.init({
    toolName: DataTypes.STRING,
    toolsIn: DataTypes.INTEGER,
    toolsTotal: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};