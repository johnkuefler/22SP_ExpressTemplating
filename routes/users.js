var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureAuthenticated, usersController.get_users);

module.exports = router;
