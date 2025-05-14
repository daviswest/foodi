import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRestaurantRecommendations = async (description, location, page = 1, pageSize = 5) => {
  try {
    const response = await axios.post(`${API_URL}/restaurants/find-restaurants`, {
      description,
      location,
      page,
      pageSize
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant recommendations:', error);
    return { restaurants: [], totalResults: 0, hasMore: false };
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