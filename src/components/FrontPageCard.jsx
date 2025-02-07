import React from 'react';
import '../styles/FrontPageCard.css';
import { Star as StarIcon } from 'react-feather';

const FrontPageCard = (props) => {
  // Calculate the number of full stars, partial star, and empty stars
  const fullStars = Math.floor(props.stars); // Full stars (e.g., 3 for 3.7)
  const partialStar = props.stars % 1; // Partial star (e.g., 0.7 for 3.7)
  const emptyStars = 5 - Math.ceil(props.stars); // Empty stars (total 5 - filled stars)

  return (
    <div className='card'>
      <img
        src={props.image}
        style={{
          height: '10rem',
          borderRadius: '1rem 1rem 0rem 0rem',
          objectFit: 'cover',
        }}
        alt={`Image of ${props.description}`}
      />
      <div className='card-body'>
        <h3>{props.description}</h3>
        <div className='stars'>
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
              <StarIcon key={`full-${index}`} color="#dc4848" size={16} style={{ fill: "#dc4848" }} />
            ))}

            {/* Partial Star */}
            {partialStar > 0 && (
              <StarIcon
                key="partial-star"
                color="#dc4848"
                size={16}
                style={{ fill: "#dc4848", clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
              />
            )}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <StarIcon key={`empty-${index}`} color="#ffffff" size={16} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FrontPageCard;
