module.exports = app => {
    const borrows = require("../controllers/borrowList.controller.js");
  
    var router = require("express").Router();
  
    
    router.post("/", borrows.create);
  
    // Retrieve all Tutorials
    router.get("/", borrows.findAllWithTool);
  
    router.get("/student/:id",borrows.findAllByStudent )

    router.get("/tool/:id",borrows.findAllByTool )
    
    // Retrieve a single Tutorial with id
    router.get("/:id", borrows.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", borrows.update);

    app.use('/api/borrow', router);
  };