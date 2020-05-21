const express = require('express');

const controllers = require('../controllers/goals')

const router = express.Router()
const auth = require('../middleware/auth');

router.get('/', auth, controllers.view_all);
router.get('/view/:id', auth, controllers.view_details);
router.post('/done', auth, controllers.done)
router.get('/add', auth, controllers.add_page);
router.post('/add_goal', auth, controllers.add_goal);
router.get('/edit/:id', auth, controllers.edit);
router.post('/update', auth, controllers.update);
router.get('/delete/:id', auth, controllers.delete_page);
router.get('/del_goal/:id', auth, controllers.delete_goal);
router.delete('/delete_all', auth, controllers.delete_all);

module.exports = router
