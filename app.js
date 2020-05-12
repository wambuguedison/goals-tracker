const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const goals = require('./models/db')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
    let object = {
      goals: docs
    }
    res.render('index', object);
  });
});

app.get('/edit/:id', (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.find({ _id: id }, (err, doc) => {
    if(err) {
      console.log(err)
    }
    let objects = {
      goal: doc
    }
    res.render('update', objects)
  });
});

app.post('/update', (req, res, next) => {
  const goal = {
    title: req.body.title,
    description: 'goal description',
    imageUrl: '',
    successes: 0,
    deleted: 0
  };
  goals.update({_id: req.body.id}, goal, {}, function (err, numReplaced) {
    if(err){
      res.status(400).json({
        error: err
      });
    }
    let update = {
      title: goal.title,
      update: 'updated'
    }
    res.render('update', update);
  });
  
  //next()
});

app.get('/delete/:id', (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.find({ _id: id }, (err, doc) => {
    if(err) {
      console.log(err)
    }
    let delete_object = {
      del_goal: doc
    }
    res.render('update', delete_object);
  });
});


app.get('/del_goal/:id', (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.remove({ _id: id }, {}, (err, numRemoved) => {
    let delete_goal = {
      delete: 'deleted'
    }
    res.render('update', delete_goal);
  });
});



module.exports = app;
