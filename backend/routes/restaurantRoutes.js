const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/find-restaurants', restaurantController.findRestaurants);
router.get("/details", restaurantController.getRestaurantDetails);

module.exports = router;