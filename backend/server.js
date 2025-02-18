const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});
/*
app.post('/api/find-restaurants', async (req, res) => {
  const { description, location } = req.body;

  console.log('Received request with description:', description, 'and location:', location);

  if (!description || !location) {
    console.error('Description or location is missing in the request body');
    return res.status(400).json({ error: 'Description and location are required' });
  }

  try {
    const mockRestaurants = [
      {
        name: "The Pasta Place",
        description: "A cozy Italian restaurant with handmade pastas and traditional dishes.",
        tags: ["Italian", "Cozy", "Family-friendly"],
        location: "New York, NY"
      },
      {
        name: "Sushi Delight",
        description: "A modern sushi bar offering fresh sushi and sashimi in a trendy setting.",
        tags: ["Sushi", "Fresh", "Trendy"],
        location: "San Francisco, CA"
      },
      {
        name: "Vegan Bistro",
        description: "Plant-based cuisine with a creative twist, serving vegan comfort food.",
        tags: ["Vegan", "Comfort Food", "Healthy"],
        location: "Los Angeles, CA"
      }
    ];

    console.log('Returning mock restaurant data:', mockRestaurants);

    // Return mock restaurant data as response
    res.json({ restaurants: mockRestaurants });

  } catch (error) {
    console.error('Error in handling request:', error.message);
    res.status(500).json({ error: 'Error processing your request' });
  }
});
*/
app.get('/api/reverse-geocode', async (req, res) => {
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
});


app.get('/api/get-location-suggestions', async (req, res) => {
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
        limit: 5, // Number of results
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
});



app.post('/api/find-restaurants', async (req, res) => {
  const { description, location } = req.body;

  console.log('Received request with description:', description, 'and location:', location);

  if (!description || !location) {
    console.error('Description or location is missing in the request body');
    return res.status(400).json({ error: 'Description and location are required' });
  }

  try {
    console.log('Calling DeepSeek API...');

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that suggests restaurants based on user descriptions and locations. Format your response as a JSON array with each restaurant having the following fields: name, description, tags, and location. Do not include any other text.',
        },
        {
          role: 'user',
          content: `User description: ${description}, Location: ${location}`,
        },
      ],
      model: 'deepseek-chat',
      max_tokens: 500,
    });

    console.log('DeepSeek API response:', JSON.stringify(completion, null, 2));

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('Invalid response from DeepSeek API');
    }

    let restaurants = completion.choices[0].message?.content;

    if (restaurants && restaurants.startsWith('```json') && restaurants.endsWith('```')) {
      restaurants = restaurants.slice(7, -3).trim();
    }

    const parsedRestaurants = JSON.parse(restaurants);

    console.log('Parsed restaurant data:', parsedRestaurants);

    res.json({ restaurants: parsedRestaurants });
  } catch (error) {
    console.error('Error calling DeepSeek API:', error.message);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
