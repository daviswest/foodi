import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg?react';
import { placeholders } from '../data/placeholders'


const Intro = ({ restaurantDescription, setRestaurantDescription, location }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

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
      setCurrentPlaceholder((prevIndex) => {
        const nextIndex = (prevIndex + 1) % placeholders.length;
        console.log('currentPlaceholder:', nextIndex);
        return nextIndex;
      });
    }, 4000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    if (restaurantDescription === '') {
      setIsFocused(false);
    }
  }
  return (
    <>
      <h1 className="intro-heading">Find the perfect restaurant with Foodi.</h1>
      <div className="intro-container">
      <form className="intro-form" onSubmit={handleSubmit}>
  <div className="input-wrapper">
    {!isFocused && restaurantDescription.length === 0 && (
    <div className="placeholder-carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateY(-${currentPlaceholder * 3.5}rem)` }}
      >
        {placeholders.map((text, index) => (
          <div className="carousel-item" key={index}>
            {text}
          </div>
        ))}
      </div>
    </div>
    )}

    <input
      className="intro-form-text"
      type="text"
      value={restaurantDescription}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />

    <button className="intro-form-submit" type="submit">
      <ArrowRight className="search-arrow" />
    </button>
  </div>
</form>

    </div>
    </>
  );
  
};

export default Intro;