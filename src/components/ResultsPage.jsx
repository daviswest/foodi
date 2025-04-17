// ResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import ResultCard from './ResultCard';
import SkeletonCard from './SkeletonCard';
import '../styles/ResultsPage.css';
import { fetchRestaurantRecommendations } from '../api/restaurantService';

const ResultsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const userLocation = searchParams.get("location");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!query || !userLocation) return;
      setIsLoading(true);
      
      try {
        console.log("Fetching results for:", query, userLocation);
        const results = await fetchRestaurantRecommendations(query, userLocation);
        setRestaurants(results);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [query, userLocation]);

  return (
    <div className="results-page">
      <h2 className="results-heading">Results for "{query}" in {userLocation}</h2>
      {isLoading ? (
        // Render a carousel containing a set of skeleton cards as placeholders.
        <div className="carousel">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : restaurants.length > 0 ? (
        <Carousel title="Top Restaurants" data={restaurants} CardComponent={ResultCard} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;