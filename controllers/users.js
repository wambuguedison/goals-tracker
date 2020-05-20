const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const users = db.users

exports.signup = (req, res, next) => {
  const user = {}
  let name = req.body.name,
    email = req.body.email,
    password = req.body.password;
  
  users.findOne({ email: email }, (err, doc) => {
    if (err) {
      res.send(err)
    }
    if (doc !== null) {
      let info = {
        name: name,
        email: email,
        password: password,
        message: "Email is already used"
      }
      res.render('signup', info)
    } else {
      user.name = name;
      user.email = email;
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          // Store hash in your password DB
          if(err) {
            res.send(err)
          }
          user.password = hash;
          users.insert(user, (err, doc) => {
            if(err){
              res.send(err)
            }
            let login = {
              email: email,
              password: password
            }
            res.render('login', login)
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
    if (doc == null || !doc) {
      res.render('login', {
        email: email,
        password: password,
        no_user: "no such user"
      });
    } else {
      try {
        bcrypt.compare(password, doc.password)
        .then((resp) => {
          if(!resp) {
            res.render('login', {
              email: email,
              password: password,
              incorrect_pass: "Incorrect password"
            })
          } else {
            const token = jwt.sign(
                { userId: doc._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
            res.cookie('AuthToken', token, { maxAge: 60000 * 24 })
            res.cookie('Name', doc.name, { maxAge: 60000 * 24 })
            res.redirect('/');
          }
        })
        .catch(e => {
          console.log(e)
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
