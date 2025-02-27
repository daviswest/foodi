const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

async function getRestaurantSuggestions(description, location) {
  try {
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

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('Invalid response from DeepSeek API');
    }

    let restaurants = completion.choices[0].message?.content;

    if (restaurants && restaurants.startsWith('```json') && restaurants.endsWith('```')) {
      restaurants = restaurants.slice(7, -3).trim();
    }

    return JSON.parse(restaurants);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error.message);
    throw error;
  }
}

module.exports = { getRestaurantSuggestions };