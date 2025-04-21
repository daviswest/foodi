import React from 'react';
import ResultCard from './ResultCard';
import SkeletonCard from './SkeletonCard';
import '../styles/ResultsPage.css';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, isLoading } = useFavorites();

  return (
    <div className="results-page">
      <h2 className="results-heading">Favorites</h2>
      {isLoading ? (
        <div className="cards-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="cards-container">
          {favorites.map((favorite) => (
            <ResultCard key={favorite.place_id} {...favorite} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
