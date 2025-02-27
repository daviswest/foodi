const deepseek = require('../utils/deepseek');

async function findRestaurants(req, res) {
  const { description, location } = req.body;
  console.log('Received description:', description);
  console.log('Received location:', location);

  if (!description || !location) {
    return res.status(400).json({ error: 'Description and location are required' });
  }

  try {
    const restaurants = await deepseek.getRestaurantSuggestions(description, location);
    res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: 'Error processing your request' });
  }
}

module.exports = { findRestaurants };