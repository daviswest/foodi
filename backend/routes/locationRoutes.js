const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/reverse-geocode', locationController.reverseGeocode);
router.get('/get-location-suggestions', locationController.getLocationSuggestions);

module.exports = router;