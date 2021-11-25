const db=require("../models");
const Borrow =require("../models").BorrowList;
const Student =require("../models").Student;
const Tool = require("../models").Tool;
const Op=db.Sequelize.Op;

exports.create=async (req, res) => {
    
    if (!req.body.studentId || !req.body.toolId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
    }

    const borrow={
        studentId: req.body.studentId,
        toolId: req.body.toolId,
        deadLineDate: req.body.deadLineDate,
        itemCount: req.body.itemCount,
        deliveredDate: req.body.deliveredDate


    };
    console.log(borrow);
    Borrow.create(borrow)
    .then(data=>{
      //console.log(data);
      decrementStorage(+req.body.toolId,+ req.body.itemCount);
      res.send(data);
        
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Noe feil skjedde ved å opprette lånt objekt"
        });
    });
};
exports.update=async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
  }
  
  Borrow.update(
    {deliveredDate: new Date() ,
    where: { id: id }
  })
  .then(incrementStorage(req.body.toolId,+ req.body.itemCount))
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

function decrementStorage(id,n){
  
  const req = Tool.findOne({ where: { id: id } });
  const a=+ req.toolsIn;
  
  
  const res = Tool.update(
    {toolsIn: a-n},
    {where: {id: id}})
  return res;
}
function incrementStorage(id,n){
  const req = Tool.findOne({ where: { id: id } });
  const a= +req.toolsTotal;
  
  
  const res =  Tool.update(
    {toolsIn: a+n},
    {where: {id: id}})
  return res;
}