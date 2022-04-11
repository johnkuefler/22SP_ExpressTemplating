var express = require('express');
var router = express.Router();
const animalsController = require('../controllers/animalsController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureAuthenticated,  animalsController.get_animals);

router.get('/create', authMiddleware.ensureAuthenticated, animalsController.get_create_animal);
router.post('/create', authMiddleware.ensureAuthenticated, animalsController.post_animal)

router.get('/update', authMiddleware.ensureAuthenticated, animalsController.get_update_animal);
router.post('/update', authMiddleware.ensureAuthenticated, animalsController.post_update_animal);

router.get('/delete', authMiddleware.ensureAuthenticated, animalsController.get_delete_animal);

module.exports = router;
