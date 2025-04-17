import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const fetchRestaurantRecommendations = async (description, location) => {
  try {
    const response = await axios.post(`${API_URL}/restaurants/find-restaurants`, {
      description,
      location,
    });
    return response.data.restaurants || [];
  } catch (error) {
    console.error('Error fetching restaurant recommendations:', error);
    return [];
  }
};

export const fetchRestaurantDetails = async (place_id) => {
  try {
    const response = await axios.get(`${API_URL}/restaurants/details`, {
      params: { place_id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return null;
  }
};