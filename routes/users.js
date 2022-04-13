var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureIsAdmin, usersController.get_users);

router.get('/create', authMiddleware.ensureIsAdmin, usersController.get_create_user);
router.post('/create', authMiddleware.ensureIsAdmin, usersController.post_create_user);

router.get('/update', authMiddleware.ensureIsAdmin, usersController.get_update_user);
router.post('/update', authMiddleware.ensureIsAdmin, usersController.post_update_user);

router.get('/delete', authMiddleware.ensureIsAdmin, usersController.get_delete_user);

module.exports = router;
