module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      onGoing: {
        type: Sequelize.STRING
      },
      banned: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Student;
  };