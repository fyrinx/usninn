const express= require('express'); 
const cors =require('cors');

const path = require('path');

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
const db = require("./models");

//console.log(process.env.NODE_ENV);
//db.sequelize.sync();
//db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//  });
// simple route

app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
require("./routes/student.routes")(app);
require("./routes/borrow.routes")(app);
require("./routes/tool.routes")(app);
// set port, listen for requests
module.exports = app;