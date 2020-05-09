const express = require('express');

const app = express();

app.use((res, req, next) => {
  res.json({
    "message": "atleast it runs for now"
  });
  console.log('atleast it runs');
});

module.exports = app;