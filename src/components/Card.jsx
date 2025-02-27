import React from 'react';
import { Star as StarIcon } from 'react-feather';

const Card = ({ image, description, stars }) => {
  const fullStars = Math.floor(stars);
  const partialStar = stars % 1;
  const emptyStars = 5 - Math.ceil(stars);

  return (
    <div className='card'>
      <img
        src={image}
        style={{
          height: '10rem',
          borderRadius: '1rem 1rem 0rem 0rem',
          objectFit: 'cover',
        }}
        alt={`Image of ${description}`}
      />
      <div className='card-body'>
        <h3>{description}</h3>
        <div className='stars'>
            {Array.from({ length: fullStars }).map((_, index) => (
              <StarIcon key={`full-${index}`} color="#dc4848" size={16} style={{ fill: "#dc4848" }} />
            ))}
            {partialStar > 0 && (
              <StarIcon
                key="partial-star"
                color="#dc4848"
                size={16}
                style={{ fill: "#dc4848", clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
              />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <StarIcon key={`empty-${index}`} color="#ffffff" size={16} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
