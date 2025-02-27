import React, { useRef } from 'react';
import '../styles/App.css';

const Carousel = ({ data, title, CardComponent }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    carouselRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      {title && <h1 className="intro-heading">{title}</h1>}
      <div className="carousel" ref={carouselRef}>
        {data.map((item, index) => (
          <CardComponent
            key={item.id || index}
            image={item.image}
            name={item.name}
            description={item.description}
            stars={item.stars || 5}
          />
        ))}
      </div>
      <button className="arrow arrow-left" onClick={() => scroll(-1)}>&#8249;</button>
      <button className="arrow arrow-right" onClick={() => scroll(1)}>&#8250;</button>
    </div>
  );
};

export default Carousel;
