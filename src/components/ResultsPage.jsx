import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ResultCard from './ResultCard';
import SkeletonCard from './SkeletonCard';
import '../styles/ResultsPage.css';
import { fetchRestaurantRecommendations } from '../api/restaurantService';

const ResultsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const observer = useRef();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const userLocation = searchParams.get("location");

  const fetchRestaurants = async (pageNum = 1) => {
    if (!query || !userLocation) return;
    const loadingState = pageNum === 1 ? setIsLoading : setIsLoadingMore;
    loadingState(true);
    
    try {
      console.log("Fetching results for:", query, userLocation, "page:", pageNum);
      const result = await fetchRestaurantRecommendations(query, userLocation, pageNum);
      if (pageNum === 1) {
        setRestaurants(result.restaurants);
      } else {
        setRestaurants(prev => [...prev, ...result.restaurants]);
      }
      setHasMore(result.hasMore);
      setTotalResults(result.totalResults);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      loadingState(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchRestaurants(1);
  }, [query, userLocation]);

  const lastRestaurantElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchRestaurants(nextPage);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore, page]);

  return (
    <div className="results-page">
      <h2 className="results-heading">Results for "{query}" in {userLocation}</h2>
      {isLoading ? (
        <div className="cards-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : restaurants.length > 0 ? (
        <>
          <div className="cards-container">
            {restaurants.map((restaurant, index) => {
              if (index === restaurants.length - 1) {
                return (
                  <div ref={lastRestaurantElementRef} key={restaurant.place_id}>
                    <ResultCard {...restaurant} />
                  </div>
                );
              }
              return <ResultCard key={restaurant.place_id} {...restaurant} />;
            })}
          </div>
          {isLoadingMore && (
            <div className="cards-container">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={`loading-${index}`} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;