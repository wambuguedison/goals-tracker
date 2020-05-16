const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const goals = require('./models/db')

const routes = require('./routes/goals')
const userRoutes = requires('./routes/users')

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
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    shortenDescription (description) {
      if (description.length < 20) {
          return description;
      }

      return description.substring(0, 17) + '...';
    }
  }
}));

app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('', routes);
app.use('/auth', userRoutes)

app.use((req, res) => {
  res.render('error');
})

module.exports = app;
