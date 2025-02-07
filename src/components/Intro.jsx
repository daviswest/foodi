import React, { useState, useEffect, useCallback } from 'react';
import ArrowRight from '../assets/arrow-right.svg?react';

const placeholders = [
  "Cozy Italian place for date night",
  "Funky coffee shops for studying",
  "Romantic date night for anniversary",
  "Trendy sushi spots in the city",
  "New boba tea spot with friends",
];

const Intro = (props) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    props.setRestaurantDescription(e.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (props.restaurantDescription) {
      console.log("Submitting description:", props.restaurantDescription);
      setIsFormSubmitted(true);
      props.handleChatSubmit(props.restaurantDescription);
    }
  }, [props.restaurantDescription, props.setIsChatSubmit]);

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setCurrentPlaceholder((prevIndex) => (prevIndex + 1) % placeholders.length)
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={`intro-container ${isFormSubmitted ? 'submitted' : ''}`}>
        <h1 className={`intro-heading ${isFormSubmitted ? 'submitted' : ''}`}>
          Find the perfect restaurant with Foodi.
        </h1>
        <form
          className={`intro-form-input ${isFormSubmitted ? 'submitted' : ''}`}
          onSubmit={handleSubmit}
        >
          <input
            className="intro-form-text"
            type="text"
            placeholder={placeholders[currentPlaceholder]}
            value={props.restaurantDescription}
            onChange={handleInputChange}
            
          />
          <button className="intro-form-submit" type="submit"><ArrowRight className="search-arrow"/></button>
        </form>
      </div>
      
    </>
  );
};

export default Intro;
