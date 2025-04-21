import React from 'react';
import { Star as StarIcon } from 'react-feather';

const Card = ({ image, description, stars }) => {
  const fullStars = Math.floor(stars);
  const partialStar = stars % 1;
  const emptyStars = 5 - Math.ceil(stars);

  const starRatingText = `${stars} out of 5 stars`;

  return (
    <article 
      className='card'
      role="article"
      aria-label={`Restaurant: ${description}`}
    >
      <img
        src={image}
        style={{
          height: '10rem',
          borderRadius: '1rem 1rem 0rem 0rem',
          objectFit: 'cover',
        }}
        alt={`Image of ${description}`}
        aria-label={`Image of ${description}`}
      />
      <div className='card-body'>
        <h3>{description}</h3>
        <div 
          className='stars'
          role="img"
          aria-label={starRatingText}
        >
            {Array.from({ length: fullStars }).map((_, index) => (
              <StarIcon 
                key={`full-${index}`} 
                color="#dc4848" 
                size={16} 
                style={{ fill: "#dc4848" }}
                aria-hidden="true"
              />
            ))}
            {partialStar > 0 && (
              <StarIcon
                key="partial-star"
                color="#dc4848"
                size={16}
                style={{ fill: "#dc4848", clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
                aria-hidden="true"
              />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <StarIcon 
                key={`empty-${index}`} 
                color="#ffffff" 
                size={16}
                aria-hidden="true"
              />
            ))}
        </div>
      </div>
    </article>
  );
};

export default Card;
