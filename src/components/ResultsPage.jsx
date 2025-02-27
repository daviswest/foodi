import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import ResultCard from './ResultCard';
import '../styles/ResultsPage.css'

const ResultsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Extract search parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const userLocation = searchParams.get("location");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!query || !userLocation) return;
      setIsLoading(true);

      try {
        console.log("Fetching results for:", query, userLocation);
        const response = await fetch('http://localhost:5001/api/find-restaurants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: query, location: userLocation }),
        });
        const data = await response.json();
        setRestaurants(data.restaurants || []);
        console.log(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="results-page">
      <h2 className="results-heading">Results for "{query}" in {userLocation}</h2>

      {isLoading ? <div className="loading-animation">Loading...</div> : <Carousel title="Top Restaurants" data={restaurants} CardComponent={ResultCard} />}

      </div>
  );
};

export default ResultsPage;
