import React from 'react';
import FrontPageCard from './FrontPageCard';
import '../styles/App.css'
import '../styles/FrontPageCard.css'
import ResultsCard from './ResultCard';

const ResultsCarousel = ({ query, location, restaurants }) => {
  return (
  <div style={{ padding: '1rem 2rem' }}>
    <h1 className="intro-heading-2">"{query}" in {location}</h1>
    <div className="horizontal-carousel-container">
      {restaurants.map((restaurant, index) => (
        <ResultsCard 
          key={index}
          image={"https://www.worldanimalprotection.ca/cdn-cgi/image/width=1280,format=auto/siteassets/shutterstock_1899421132.jpg"}
          description={restaurant.name}
          stars="5"
        />
      ))}
    </div>
  </div>
  );
};

export default ResultsCarousel;