import React, { useRef } from 'react';
import FrontPageCard from './FrontPageCard';
import '../styles/App.css';
import '../styles/FrontPageCard.css';

const Carousel = ({ coffeeShopData }) => {
  const carouselRef = useRef(null);

  const handleLeftClick = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll left by 200px
  };

  const handleRightClick = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll right by 200px
  };

  return (
    <div className="carousel-container">
      <h1 className="intro-heading-2">Funky Coffee Shops in New York, NY</h1>
      <div className="horizontal-carousel-container" ref={carouselRef}>
        {coffeeShopData.map((coffeeShop) => (
          <FrontPageCard
            key={coffeeShop.id}
            image={coffeeShop.image}
            description={coffeeShop.description}
            stars={coffeeShop.stars}
          />
        ))}
      </div>

      <button className="arrow-button arrow-left" onClick={handleLeftClick}>
        &#8249;
      </button>

      <button className="arrow-button arrow-right" onClick={handleRightClick}>
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
