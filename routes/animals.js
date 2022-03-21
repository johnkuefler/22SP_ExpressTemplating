var express = require('express');
var router = express.Router();
const animalsController = require('../controllers/animalsController');

router.get('/', animalsController.get_animals);

module.exports = router;
