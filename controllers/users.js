const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const users = db.users

exports.signup = (req, res, next) => {
  const user = {}
  let email = req.body.email,
    password = req.body.password;
  
  users.findOne({ email: email }, (err, doc) => {
    if (err) {
      res.send(err)
    }
    if (doc !== null) {
      res.send("email is already used")
    } else {
      user.email = email;
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          // Store hash in your password DB
          user.password = hash
          users.insert(user, (err, doc) => {
            if(err){
              res.send(err)
            }
            res.status(201).send(doc)
          })
        });
      }); 
    }
  });
};

exports.login = (req, res, next) => {
  let email = req.body.email,
    password = req.body.password;
    
  users.findOne({ email: email }, (err, doc) => {
    if (err) {
      res.status(500).send(err)
    }
    if (doc == null) {
      res.status(401).send("no such user")
    } else {
      try {
        bcrypt.compare(password, doc.password)
        .then((resp) => {
          if(!resp) {
            res.status(401).send("password doesn't match") 
          } else {
            const token = jwt.sign(
                { userId: doc._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
            res.cookie('AuthToken', token, { maxAge: 60000 * 24 })
            res.redirect('/');
          }
        });
      } catch (e) {
        res.send(e)
      }
    }
  });
};

exports.signup_form = (req, res, next) => {
  res.render('signup')
}

exports.login_form = (req, res, next) => {
  res.render('login')
}

exports.logout = (req, res, next) => {
  res.clearCookie('AuthToken').send('logged out');
}
