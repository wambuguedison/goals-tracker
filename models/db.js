const nedb = require('nedb')

db = new nedb({ filename: 'models/goals.db', autoload: true });

module.exports = db