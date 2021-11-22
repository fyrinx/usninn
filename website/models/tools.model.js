module.exports = (sequelize, Sequelize) => {
    const Tools = sequelize.define("tools", {
      toolName: {
        type: Sequelize.STRING
      },
      toolsIn: {
        type: Sequelize.INTEGER
      },
      toolsTotal: {
        type: Sequelize.INTEGER
      }
    });
  
    return Tools;
  };