const axios = require('axios');

async function reverseGeocode(req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon: lng,
        format: 'json',
      },
    });

    const data = response.data;
    const city = data.address.city || data.address.town || data.address.village || '';
    const state = data.address.state || '';

    res.json({ city, state, formattedLocation: `${city}, ${state}` });
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Error fetching location data' });
  }
}

async function getLocationSuggestions(req, res) {
  const { q } = req.query;

  if (!q || q.length < 3) {
    return res.status(400).json({ error: "Query must be at least 3 characters" });
  }

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: q,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      },
    });

    const suggestions = response.data.map((place) => {
      const city = place.address.city || place.address.town || place.address.village || place.address.county || '';
      const state = place.address.state || '';
      return city && state ? `${city}, ${state}` : city || state;
    });

    res.json({ predictions: suggestions });
  } catch (error) {
    console.error("OpenStreetMap Nominatim API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch location suggestions" });
  }
}

module.exports = { reverseGeocode, getLocationSuggestions };