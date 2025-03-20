import axios from "axios";

const API_URL = 'http://localhost:5001/api/auth';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || ["Registration failed. Please try again."];
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please check your credentials.";
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const refreshToken = async () => {
  try {
    await axios.get(`${API_URL}/refresh`, { withCredentials: true });
  } catch (error) {
    console.error("Token refresh failed", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return null;
  }
};
