const fetch = require('node-fetch');
const dynamoDB = require('../config/db');
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_BASE_URL = process.env.PINECONE_BASE_URL || 'https://east-village-restaurants-5b8bhxh.svc.aped-4627-b74a.pinecone.io';

let pipe = null;
async function initPipeline() {
  if (!pipe) {
    const transformers = await import('@xenova/transformers');
    pipe = await transformers.pipeline(
      'feature-extraction',
      'sentence-transformers/all-mpnet-base-v2',
      { quantized: false }
    );
  }
}

async function getQueryEmbedding(query, context = {}) {
  await initPipeline();

  const enrichedQuery = `${query} 
    ${context.priceLevel ? `with price level ${context.priceLevel}` : ''} 
    ${context.types ? `for ${context.types.join(' or ')}` : ''}`;
  
  const output = await pipe(enrichedQuery, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

function calculateTemporalScore(restaurant, timeOfDay) {
  if (!restaurant.opening_hours?.periods) return 1.0;
  
  const hour = new Date().getHours();
  const day = new Date().getDay();
  let score = 1.0;

  const isOpen = restaurant.opening_hours.periods.some(period => {
    const openDay = parseInt(period.open.day);
    const closeDay = parseInt(period.close.day);
    const openHour = parseInt(period.open.time.substring(0, 2));
    const closeHour = parseInt(period.close.time.substring(0, 2));
    
    return day >= openDay && day <= closeDay && 
           hour >= openHour && hour < closeHour;
  });

  if (timeOfDay === 'morning' && restaurant.types?.includes('breakfast')) {
    score *= 1.5;
  } else if (timeOfDay === 'evening' && restaurant.types?.includes('dinner')) {
    score *= 1.5;
  }

  score *= isOpen ? 1.2 : 0.8;
  return score;
}

function calculateContextScore(restaurant, context) {
  let score = 1.0;

  if (context.priceLevel && restaurant.price_level) {
    const priceDiff = Math.abs(context.priceLevel - restaurant.price_level);
    score *= 1 - (priceDiff * 0.2);
  }

  if (context.types && restaurant.types) {
    const matchingTypes = context.types.filter(type => 
      restaurant.types.includes(type)
    );
    score *= 1 + (matchingTypes.length * 0.1);
  }

  if (restaurant.rating) {
    score *= restaurant.rating / 5.0;
  }

  if (restaurant.user_ratings_total) {
    const popularityScore = Math.min(1, restaurant.user_ratings_total / 1000);
    score *= 0.7 + (popularityScore * 0.3);
  }

  return score;
}

async function calculateRestaurantScore(restaurant, queryEmbedding, context) {
  const vectorScore = restaurant.vectorScore || 1.0;
  const temporalScore = calculateTemporalScore(restaurant, context.timeOfDay);
  const contextScore = calculateContextScore(restaurant, context);

  const finalScore = 
    (vectorScore * 0.5) + 
    (temporalScore * 0.25) + 
    (contextScore * 0.25);

  return {
    ...restaurant,
    finalScore,
    scoringBreakdown: {
      vectorScore,
      temporalScore,
      contextScore
    }
  };
}

async function queryPinecone(embedding, topK = 10) {
  const url = `${PINECONE_BASE_URL}/query`;
  const body = {
    vector: embedding,
    topK,
    includeValues: false,
    includeMetadata: true,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Api-Key': PINECONE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data.matches.map(match => ({
    ...match,
    vectorScore: match.score
  }));
}

async function getRestaurantFromDynamo(placeId) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE || "Restaurants",
    Key: { place_id: placeId },
  };
  const result = await dynamoDB.send(new GetCommand(params));
  console.log('Restaurant data from DynamoDB:', JSON.stringify(result.Item, null, 2));
  return result.Item;
}

async function fetchPhotoForRestaurant(placeId) {
  const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  if (!GOOGLE_API_KEY) {
    return "https://via.placeholder.com/400?text=No+Photo+Available";
  }
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
  try {
    const res = await fetch(detailsUrl);
    const json = await res.json();
    if (json && json.result && json.result.photos && json.result.photos.length > 0) {
      const photoReference = json.result.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
      return photoUrl;
    } else {
      return "https://via.placeholder.com/400?text=No+Photo+Available";
    }
  } catch (error) {
    console.error('Error fetching photo for placeId', placeId, error);
    return "https://via.placeholder.com/400?text=No+Photo+Available";
  }
}

async function getRestaurantSuggestions(description, location, context = {}, page = 1, pageSize = 5) {
  const queryEmbedding = await getQueryEmbedding(description, context);
  const matches = await queryPinecone(queryEmbedding, 20);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalResults = matches.length;

  const pageMatches = matches.slice(startIndex, endIndex);
  const restaurants = [];

  for (const match of pageMatches) {
    const restaurant = await getRestaurantFromDynamo(match.id);
    if (restaurant) {
      if (!restaurant.photo) {
        restaurant.photo = await fetchPhotoForRestaurant(restaurant.place_id);
      }

      const scoredRestaurant = await calculateRestaurantScore(
        restaurant,
        queryEmbedding,
        context
      );

      restaurants.push({
        ...scoredRestaurant,
        description: restaurant.editorial_summary?.overview || "No description available"
      });
    }
  }

  return {
    restaurants,
    totalResults,
    hasMore: endIndex < totalResults
  };
}

module.exports = {
  getRestaurantSuggestions,
  getRestaurantFromDynamo,
  fetchPhotoForRestaurant
};