const nedb = require('nedb')

exports.goals = new nedb({ filename: './models/goals.db', autoload: true });

exports.users = new nedb({ filename: './models/users.db', autoload: true })
