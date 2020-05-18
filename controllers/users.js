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
      user.password = password;
      users.insert(user, (err, doc) => {
        if(err){
          res.send(err)
        }
        res.status(201).send(doc)
      })
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
    } 
    else {
      if (doc.password !== password) {
        res.status(401).send("password doesn't match")
      } else {
        res.status(200).json({
          userId: doc._id,
          token: 'token'
        })
      }
    }
  });
};
