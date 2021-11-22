const express= require('express'); 
const cors =require('cors');



const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
const db = require("./models");

console.log(process.env.NODE_ENV);
//db.sequelize.sync();
//db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "USN-låneservice!" });
});

require("./routes/student.routes")(app);
require("./routes/borrow.routes")(app);
require("./routes/tool.routes")(app);
// set port, listen for requests
module.exports = app;