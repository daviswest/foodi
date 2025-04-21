const restaurantSearch = require('../utils/restaurantSearch');
const fetch = require('node-fetch');

async function getRestaurantDetails(req, res) {
  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ error: 'place_id is required' });
  }

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'Google API key is not configured' });
    }

    const fields = [
      'name',
      'rating',
      'formatted_phone_number',
      'formatted_address',
      'opening_hours',
      'photos',
      'reviews',
      'website'
    ].join(',');

    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(500).json({ error: `Google API error: ${data.status}` });
    }
    
    res.json(data.result);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
}

async function findRestaurants(req, res) {
  const { description, location, page = 1, pageSize = 5 } = req.body;
  console.log('Received description:', description);
  console.log('Received location:', location);
  console.log('Received page:', page);
  console.log('Received pageSize:', pageSize);

  if (!description || !location) {
    return res.status(400).json({ error: 'Description and location are required' });
  }

  try {
    const result = await restaurantSearch.getRestaurantSuggestions(description, location, {}, page, pageSize);
    res.json(result);
  } catch (error) {
    console.error("Error in findRestaurants:", error);
    res.status(500).json({ error: 'Error processing your request' });
  }
}

module.exports = { findRestaurants, getRestaurantDetails };
