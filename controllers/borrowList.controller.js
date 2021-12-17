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
  if(a<=0){
    res.status(405).send({
      message: "Utstyret er ikke tilgjengelig"
    });
    return;
  }
 
console.log(borrow.toolId);
Tool.update(
  {toolsIn: a-1},
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

exports.createByLink=async (req, res) => {
    
    //Finner de ulike ID fra parametre.
    const studentId=req.params.id.substring(0,12);
    const toolId= req.params.id.substring(12,23);

    //Setting Dates

    var date = new Date();
    date.setDate(date.getDate()+30);
      const borrow={
        studentId: studentId,
        toolId: toolId,
        //deliveredDate: "",
        deadlineDate: date
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
    if(a<=0){
      res.status(405).send({
        message: "Utstyret er ikke tilgjengelig"
      });
      return;
    }
   
  console.log(borrow.toolId);
  Tool.update(
    {toolsIn: a-1},
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
  const sum=a+1;
  if(sum>=sb.toolsTotal) {
    res.status(405).send({
      message: "Allerede fullt med utstyr. Kontakt admin"
    });
    return;
  }

  //console.log("ID is "+id+" Toolid is is "+tId+" A is "+a);
  //console.log("Loaned "+s.itemCount)
   
  
  const now= new Date();
  //Updating borrow¨
  //console.log(now);
  
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

exports.deliver =async (req, res) => {
  const sId=req.body.studentId;
  const tId=req.body.toolId;
  if (!req.body) {
    res.status(400).send({
      message: "Kan ikke være tom!"
    });
    return;
    }
  const one=await Borrow.findOne({
    where: {
      studentId: sId,
      toolId: tId,
      deliveredDate: null
    },
    include:[{
      model: Tool,
      
    }],
    order: [
      ['createdAt','asc'],
      ['id','asc'],
    ]

  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Noe feil skjedde ved å finne låneobjekt."
        

    });
    return;
  });
  
  const tIn=one.Tool.toolsIn;
  const tTotal=one.Tool.toolsTotal;
  console.log(tIn+" "+tTotal);

   if(one.Tool.toolsIn+1>=one.Tool.toolsTotal) {
     res.status(405).send({
       message: "Allerede fullt med utstyr. Kontakt admin"
     });
     return;
   }

  Tool.update(
    {toolsIn: tIn+1},
    {where: {id: tId}})
    .catch(err=>{
      res.status(500).send({
          erro: err,
          message: "Noe feil skjedde under oppdatering av tabellene"
     });
      return;
  });

const now= Date.now();
 
  Borrow.update(
    {deliveredDate: now},
    {where: { id: one.id }}).
    then(data => {
        console.log(data);
        res.send(data);
      }).catch(err=>{
       res.status(500).send({
           message: 
           err.message || "Noe feil skjedde ved å oppdatere lån"
      });
      return;
   })

}

exports.deliverById =async (req, res) => {
  const studentId=req.params.id.substring(0,12);
    const toolId= req.params.id.substring(12,23);
  if (!req.body) {
    res.status(400).send({
      message: "Kan ikke være tom!"
    });
    return;
    }
  const one=await Borrow.findOne({
    where: {
      studentId: studentId,
      toolId: toolId,
      deliveredDate: null
    },
    include:[{
      model: Tool,
      
    }],
    order: [
      ['createdAt','asc'],
      ['id','asc'],
    ]

  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Noe feil skjedde ved å finne låneobjekt."
        

    });
    return;
  });
  
  const tIn=one.Tool.toolsIn;
  const tTotal=one.Tool.toolsTotal;
  console.log(tIn+" "+tTotal);

   if(one.Tool.toolsIn+1>=one.Tool.toolsTotal) {
     res.status(405).send({
       message: "Allerede fullt med utstyr. Kontakt admin"
     });
     return;
   }

  Tool.update(
    {toolsIn: tIn+1},
    {where: {id: toolId}})
    .catch(err=>{
      res.status(500).send({
          erro: err,
          message: "Noe feil skjedde under oppdatering av tabellene"
     });
      return;
  });

const now= Date.now();
 
  Borrow.update(
    {deliveredDate: now},
    {where: { id: one.id }}).
    then(data => {
        console.log(data);
        res.send(data);
      }).catch(err=>{
       res.status(500).send({
           message: 
           err.message || "Noe feil skjedde ved å oppdatere lån"
      });
      return;
   })

}

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