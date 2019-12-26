const express = require('express');
const app = express();
const config = require('./config/Db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

//view engine
app.set('view engine', 'pug');
app.set('views', './views');

//body parser will receive post data from font end
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set global promise for moongose

mongoose.Promise = global.Promise;

//db connection

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  res => {
    console.log('Database successfully connected');
  },
  err => {
    console.log(err);
  }
);
app.use(cors());

const proRoute = require('./router/product.router');
app.use('/', proRoute);

app.listen(PORT, function () {
  console.log(`server is running on url http://localhost:${PORT}`);
});