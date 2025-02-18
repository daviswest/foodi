const API_URL = 'http://localhost:5001/api';

export const fetchLocationSuggestions = async (query) => {
  if (query.length < 3) return [];

  try {
    const response = await fetch(`${API_URL}/get-location-suggestions?q=${query}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.predictions || [];
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
};
