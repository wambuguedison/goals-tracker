const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies['AuthToken'];
  if(token) {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).send('Invalid user ID');
    } else {
      next();
    }
  } else {
    res.render('login');
  }
};
