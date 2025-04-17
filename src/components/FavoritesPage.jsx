import React from 'react';
import Carousel from './Carousel';
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
        <div className="carousel">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <Carousel title="Top Restaurants" data={favorites} CardComponent={ResultCard} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
