const db=require("../models");
const Borrow =db.borrowList;

const Op=db.Sequelize.Op;

exports.create=(req, res) => {
 
    if (!req.body.studentId || !req.body.toolName  || !req.body.toolId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
    }
    const borrow={
        toolName: req.body.toolName,
        studentId: req.body.studentId,
        toolId: req.body.toolId,
        deadLineDate: req.body.deadLineDate


    };

    Borrow.create(borrow)
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

        
        Borrow.findAll()
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Noe feil skjedde ved å finne studentene."
            });
          });
      
};
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Borrow.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Kan ikke finne student med id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Feil med å finne student med id=" + id
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;

  Tools.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tools was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tool with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tools with id=" + id
      });
    });
};
