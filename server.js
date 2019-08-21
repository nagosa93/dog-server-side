const config = require('./config/db');
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dogRoute = require('./routes/dog');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user')

const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

mongoose.connect(config.mongoUrl, { useNewUrlParser: true }, err => {
  if (err) {
    throw err;
  }
  console.log("conection sucsees");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dog', dogRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);



app.listen(8000);
