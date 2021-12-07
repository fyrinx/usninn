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

    //Setting Dates

    
      const borrow={
        studentId: req.body.studentId,
        toolId: req.body.toolId,
        itemCount: req.body.itemCount,
        //deliveredDate: "",
        deadlineDate: Date.parse(req.body.deadlineDate+"T23:59:59")
    };
    console.log(borrow.deadlineDate);
    const s =await Tool.findOne({ where: { id: borrow.toolId } }).catch(err=>{
    res.status(500).send({
        message: "Noe feil skjedde når verktøy-objektet hentes"
    });
    return;
});
  //console.log(s);
  const a=+ s.toolsIn;
  //console.log("A is: "+a);
    if(borrow.itemCount>a){
      res.status(400).send({
        message: "Kan ikke låne mer enn tilgjengelig"
      });
      return;
    }
   
  console.log(borrow.toolId);
  Tool.update(
    {toolsIn: a-borrow.itemCount},
    {where: {id: borrow.toolId}}).catch(err=>{
      res.status(500).send({
          message: "Noe feil skjedde under oppdatering av tabellene"
      });
      return;
  });
  Borrow.create(borrow)
    .then(data=>{
      //console.log(data);
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
  
  const s =await Borrow.findOne({ where: { id:id } }).catch(err=>{
      res.status(500).send({
          message: "Noe feil skjedde når verktøy-objektet hentes"
      });
      return;
  });
  const tId=s.toolId;
  const sb =await Tool.findOne({ where: { id: tId } }).catch(err=>{
    res.status(500).send({
        message: "Noe feil skjedde når verktøy-objektet hentes"
    });
    return;
  });
  const a=+ sb.toolsIn;
  const sum=a+s.itemCount
  console.log("ID is "+id+" Toolid is is "+tId+" A is "+a);
  console.log("Loaned "+s.itemCount)
   Tool.update(
     {toolsIn: sum},
     {where: {id: tId}})
     .catch(err=>{
       res.status(500).send({
           erro: err,
           message: "Noe feil skjedde under oppdatering av tabellene"
      });
       return;
   });
  
  const now= new Date();
  //Updating borrow¨
  console.log(now);

  Borrow.update(
     {deliveredDate: now},
     {where: { id: id }}).then(data=>{
      //console.log(data);
      res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Noe feil skjedde ved å oppdatere lån"
       });
       return;
    })
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
exports.findAllByStudent = (req, res) => {

  const std= req.params.id;
  console.log("test");    
  console.log(std);  
  Borrow.findAll({
    where:{studentId: std},
    include:[{
      model: Tool,
    }]})
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
exports.findAllByTool = (req, res) => {

  const ttd= req.params.id;
  console.log("test");    
  console.log(ttd);  
  Borrow.findAll({
    where:{toolId: ttd},
    include:[{
      model: Student,
    }]})
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
exports.findAllWithTool = (req, res) => {

  
  Borrow.findAll({
    include:[{
      model: Tool,
    }]})
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
  
    Borrow.findByPk(id, {
      include:[
      {model: Tool},
      {model: Student}]
    })
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