const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const controllers = require('../controllers/goals')

const router = express.Router()

router.get('/', controllers.view_all);
router.get('/view/:id', controllers.view_details)
router.get('/add', controllers.add_page);
router.post('/add_goal', controllers.add_goal);
router.get('/edit/:id', controllers.edit);
router.post('/update', controllers.update);
router.get('/delete/:id', controllers.delete_page);
router.get('/del_goal/:id', controllers.delete_goal);
router.delete('/delete_all', controllers.delete_all);

module.exports = router
