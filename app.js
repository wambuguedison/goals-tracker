const express = require('express');
const hbs = require('express-handlebars');
const goals = require('./models/db')

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

app.get('/', (req, res, next) => {
  goals.find({}, (err, docs) => {
    if(err){
      console.log(err)
    }
    let obj3 = {
      goals: docs
    }
    res.render('index', obj3);
  });
});

module.exports = app;