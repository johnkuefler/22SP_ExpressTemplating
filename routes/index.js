var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');

const authMiddleware = require('../middleware/auth');


/* GET home page. */
router.get('/', authMiddleware.ensureAuthenticated, homeController.get_home);

module.exports = router;
