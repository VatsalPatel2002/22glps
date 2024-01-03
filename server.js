const express = require("express");
const cors = require("cors");
// const db = require('./server/config/db.config');
// const db = require('../backend/config/db.config');
const db = require('./backend/config/db.config')
const path = require('path')
const mongoose = require('mongoose');
// const passportManager = require('./server/middlewares/authJwt')
// const logger = require('logger');
// var morgan = require('morgan');
// const router = require('./routes')
const router = require('./backend/routes')
// const db = require("./server/models");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb+srv://vatsalpatel2216:vatsalpatel@cluster0.lsqjmhn.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Successfully connect to Database.");
  
  })
  .catch(err => {
    console.error("Connection error", err);
  });

//   app.use(morgan(':method :url :response-time'))
//   app.use(morgan('dev', {
//     skip: function (req, res) { return res.statusCode < 200 }
//   }))

app.use('/',router);

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
