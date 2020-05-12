const nedb = require('nedb')

db = new nedb({ filename: 'goals.db', autoload: true });

module.exports = db