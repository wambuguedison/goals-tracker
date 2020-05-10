const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.set('view engine', 'hbs');

app.engine( 'hbs', hbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/",(req, res, next) => {
  let obj = [{
    test: "yes"
  },{
    test: "no"
  }];
  let obj2 ={
    objects: obj,
    helpers: "help"
  }
  res.render('index', obj2);
  console.log('atleast it runs');
});

module.exports = app;