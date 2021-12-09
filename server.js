const app  =require('./app.js')
const displayRoutes = require('express-routemap');
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    displayRoutes(app);
  });
  
