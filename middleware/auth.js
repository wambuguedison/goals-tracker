const jwt = require('jsonwebtoken');
const db = require('../models/db');
const users = db.users

module.exports = (req, res, next) => {
  const token = req.cookies['AuthToken'];
  if(token) {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).send('Invalid user ID');
    } else {
      req.id = userId;
      users.findOne({ _id: userId }, (err, doc) => {
        if(err) {
          console.log(err)
        }
        req.name = doc.name;
        req.id = userId;
        next();
      });
    }
  } else {
    res.render('login');
  }
};
