const express = require('express');

const controllers = require('../controllers/goals')

const router = express.Router()
const auth = require('../middleware/auth');

router.get('/', auth, controllers.view_all);
router.get('/view/:id', controllers.view_details)
router.get('/add', controllers.add_page);
router.post('/add_goal', controllers.add_goal);
router.get('/edit/:id', controllers.edit);
router.post('/update', controllers.update);
router.get('/delete/:id', controllers.delete_page);
router.get('/del_goal/:id', controllers.delete_goal);
router.delete('/delete_all', controllers.delete_all);

module.exports = router
