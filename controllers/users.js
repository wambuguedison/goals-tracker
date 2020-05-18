const db = require('../models/db');
const users = db.users

exports.signup = (req, res, next) => {
  const user = {}
  let email = req.body.email,
    password = req.body.password;
  
  users.findOne({ email: email }, function (err, doc) {
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
        res.send(doc)
      })
    }
  });
};

/*exports.login = (req, res, next) => {

};*/