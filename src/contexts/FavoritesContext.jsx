import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getFavorites as fetchFavoritesFromServer,
  addFavorite as addFavoriteToServer,
  removeFavorite as removeFavoriteFromServer,
} from "../api/favoriteService";
import useAuth from "../hooks/useAuth";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) {
        setFavorites([]);
        return;
      }
      try {
        const { favorites: favs } = await fetchFavoritesFromServer();
        console.log(favs);
        setFavorites(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    fetchFavorites();
  }, [user]);

  async function addFavorite(restaurant) {
    try {
      await addFavoriteToServer(restaurant.place_id);
      setFavorites((prev) => [...prev, restaurant]);
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  }

  async function removeFavorite(place_id) {
    try {
      await removeFavoriteFromServer(place_id);
      setFavorites((prev) => prev.filter((fav) => fav.place_id !== place_id));
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  }

  function isFavorite(place_id) {
    return favorites.some((fav) => fav.place_id === place_id);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
