const express = require('express');
const router = express.Router(),
    weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeatherPage);

router.get('/:lat/:lon', weatherController.getWeatherData);

module.exports = router;