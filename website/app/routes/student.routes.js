module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Lag en ny student
    router.post("/", students.create);
  
    // Hent alle studenter
    router.get("/", students.findAll);
  

    // Hent en student med en ID
    router.get("/:id", students.findOne);
  
    // Endre på student
    router.put("/:id", students.update);
  
    // Fjern en student
    router.delete("/:id", students.delete);
  
    
    router.delete("/", students.deleteAll);
  
    app.use('/api/students', router);
  };