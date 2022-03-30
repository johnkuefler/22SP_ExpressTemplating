var express = require('express');
var router = express.Router();
const animalsController = require('../controllers/animalsController');

router.get('/', animalsController.get_animals);

router.get('/create', animalsController.get_create_animal);

router.post('/create', animalsController.post_animal)

module.exports = router;
