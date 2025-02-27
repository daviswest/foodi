const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/find-restaurants', restaurantController.findRestaurants);

module.exports = router;