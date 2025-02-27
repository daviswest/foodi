import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg?react';

const placeholders = [
  "Cozy Italian place for date night",
  "Funky coffee shops for studying",
  "Romantic date night for anniversary",
  "Trendy sushi spots in the city",
  "New boba tea spot with friends",
];

const Intro = ({ restaurantDescription, setRestaurantDescription, location }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRestaurantDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (restaurantDescription && location) {
      console.log("Navigating to results page...");
      navigate(`/results?query=${encodeURIComponent(restaurantDescription)}&location=${encodeURIComponent(location)}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="intro-container">
      <h1 className="intro-heading">Find the perfect restaurant with Foodi.</h1>
      <form className="intro-form-input" onSubmit={handleSubmit}>
        <input
          className="intro-form-text"
          type="text"
          placeholder={placeholders[currentPlaceholder]}
          value={restaurantDescription}
          onChange={handleInputChange}
        />
        <button className="intro-form-submit" type="submit">
          <ArrowRight className="search-arrow" />
        </button>
      </form>
    </div>
  );
};

export default Intro;
