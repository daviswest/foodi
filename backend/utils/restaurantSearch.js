const fetch = require('node-fetch');
const dynamoDB = require('../config/db');
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'east-village-restaurants';
const PINECONE_ENV = process.env.PINECONE_ENV || 'us-east-1';
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

async function getQueryEmbedding(query) {
  await initPipeline();
  const output = await pipe(query, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

async function queryPinecone(embedding, topK = 5) {
  const url = `${PINECONE_BASE_URL}/query`;
  const body = {
    vector: embedding,
    topK,
    includeValues: false,
    includeMetadata: true,
  };

  console.log("Querying Pinecone with body:", body);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Api-Key': PINECONE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  console.log("Raw Pinecone response:", text);
  
  try {
    const data = JSON.parse(text);
    return data.matches;
  } catch (err) {
    throw new Error("Failed to parse Pinecone response as JSON: " + text);
  }
}

async function getRestaurantFromDynamo(placeId) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE || "Restaurants",
    Key: { place_id: placeId },
  };
  const result = await dynamoDB.send(new GetCommand(params));
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

async function getRestaurantSuggestions(description, location) {
  const queryText = `${description}`;
  const embedding = await getQueryEmbedding(queryText);
  const matches = await queryPinecone(embedding, 5);

  const restaurants = [];
  for (const match of matches) {
    const restaurant = await getRestaurantFromDynamo(match.id);
    if (restaurant) {
      if (!restaurant.photo) {
        restaurant.photo = await fetchPhotoForRestaurant(restaurant.place_id);
      }
      restaurants.push(restaurant);
    }
  }
  return restaurants;
}

module.exports = {
  getRestaurantSuggestions, getRestaurantFromDynamo, fetchPhotoForRestaurant
};