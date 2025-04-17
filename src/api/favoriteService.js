const API_BASE_URL = "http://localhost:5001/api";

export async function addFavorite(restaurantId) {
  const response = await fetch(`${API_BASE_URL}/favorites/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ restaurantId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add favorite");
  }
  return await response.json();
}

export async function removeFavorite(restaurantId) {
  const response = await fetch(`${API_BASE_URL}/favorites/remove`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ restaurantId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to remove favorite");
  }
  return await response.json();
}

export async function getFavorites() {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch favorites");
  }
  return await response.json();
}