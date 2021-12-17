module.exports = app => {
    const borrows = require("../controllers/borrowList.controller.js");
  
    var router = require("express").Router();
  
    
    router.post("/", borrows.create);
    
    router.put("/",borrows.deliver);
    router.get("/", borrows.findAllWithTool);
  
    router.get("/student/:id",borrows.findAllByStudent )

    router.get("/tool/:id",borrows.findAllByTool )
    router.get("/add/:id", borrows.createByLink);
    router.get("/deliver/:id", borrows.deliverById);
    // Retrieve a single Tutorial with id
    router.get("/:id", borrows.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", borrows.update);

    

    app.use('/api/borrow', router);
  };