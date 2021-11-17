const db=require("../models");
const Student =db.students;

const Op=db.Sequelize.Op;

exports.create=(req, res) => {
 
    if (!req.body.firstName || req.body.lastName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
    }
    const student={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        onGoing: req.body.onGoing,
        banned: false


    };

    Student.create(student)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Noe feil skjedde ved å opprette student"
        });
    });
};
exports.findAll = (req, res) => {
  
};
exports.update = (req, res) => {
  
};
exports.delete = (req, res) => {
  
};
exports.deleteAll = (req, res) => {
  
};