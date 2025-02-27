import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Replace with your actual API URL

export const fetchLocationSuggestions = async (query) => {
  if (query.length < 3) return [];

  try {
    const response = await axios.get(`${API_URL}/get-location-suggestions`, {
      params: { q: query },
    });
    return response.data.predictions || [];
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
};

export const getCurrentPosition = async () => {
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    return null;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      (error) => {
        console.error('Geolocation error:', error);
        reject(null);
      }
    );
  });
};

export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_URL}/reverse-geocode`, {
      params: { lat: latitude, lng: longitude },
    });
    return response.data.formattedLocation || 'Location unavailable';
  } catch (error) {
    console.error('Error fetching reverse geocode:', error);
    return 'Location unavailable';
  }
};

export const getUserLocation = async () => {
  try {
    const position = await getCurrentPosition();
    if (!position) return 'Location unavailable';
    return await reverseGeocode(position.latitude, position.longitude);
  } catch (error) {
    return 'Location unavailable';
  }
};