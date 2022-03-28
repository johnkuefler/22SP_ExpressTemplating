var express = require('express');
var router = express.Router();
const animalsController = require('../controllers/animalsController');

router.get('/', animalsController.get_animals);

router.post('/create', animalsController.post_animal)

module.exports = router;
