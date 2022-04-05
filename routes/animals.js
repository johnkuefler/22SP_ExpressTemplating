var express = require('express');
var router = express.Router();
const animalsController = require('../controllers/animalsController');

router.get('/', animalsController.get_animals);

router.get('/create', animalsController.get_create_animal);
router.post('/create', animalsController.post_animal)

router.get('/update', animalsController.get_update_animal);
router.post('/update', animalsController.post_update_animal);

router.get('/delete', animalsController.get_delete_animal);

module.exports = router;
