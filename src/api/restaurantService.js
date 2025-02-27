import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const fetchRestaurantRecommendations = async (description, location) => {
  try {
    const response = await axios.post(`${API_URL}/find-restaurants`, {
      description,
      location,
    });
    return response.data.restaurants || [];
  } catch (error) {
    console.error('Error fetching restaurant recommendations:', error);
    return [];
  }
};