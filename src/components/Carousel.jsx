import React, { useRef } from 'react';
import '../styles/App.css';

const Carousel = ({ data, CardComponent }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    carouselRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
      <button className="arrow arrow-left" onClick={() => scroll(-1)}>&#8249;</button>
      {data.map((item, index) => (
  <CardComponent
    key={item.place_id || index}
    place_id={item.place_id}
    name={item.name}
    description={item.editorial_summary?.overview || "No description available."}
    stars={item.rating || 5}
    image={item.photo || 'default-image.png'}
    website={item.website}
  />
))}
      <button className="arrow arrow-right" onClick={() => scroll(1)}>&#8250;</button>

      </div>
    </div>
  );
};

export default Carousel;
