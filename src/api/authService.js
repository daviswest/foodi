import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
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
      `${API_URL}/auth/login`,
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
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const refreshToken = async () => {
  try {
    await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
  } catch (error) {
    console.error("Token refresh failed", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, { email });
  } catch (error) {
    throw error.response?.data?.message || "Could not send reset email.";
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
  }
  catch (error) {
    throw error.response?.data?.message || "Password reset failed.";
  }
};