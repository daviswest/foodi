import React, { useEffect, useState } from "react";
import { Star as StarIcon } from "react-feather";
import { X as XIcon } from "react-feather";
import { fetchRestaurantDetails } from "../api/restaurantService";
import "../styles/RestaurantDetailsModal.css";

const RestaurantDetailsModal = ({ restaurant, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      if (!restaurant.place_id) return;
      setLoading(true);
      const fetchedDetails = await fetchRestaurantDetails(restaurant.place_id);
      setDetails(fetchedDetails);
      setLoading(false);
    };

    getDetails();
  }, [restaurant.place_id]);

  const displayName = details?.name || restaurant.name;
  const stars = details?.rating || restaurant.rating || 0;
  const fullStars = Math.floor(stars);
  const partialStar = stars % 1;
  const emptyStars = 5 - Math.ceil(stars);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <XIcon size={24} />
        </button>
        
        <div className="modal-header">
          <h2>{displayName}</h2>
          <div className="stars">
            {Array.from({ length: fullStars }).map((_, index) => (
              <StarIcon
                key={`full-${index}`}
                color="#dc4848"
                size={16}
                style={{ fill: "#dc4848" }}
              />
            ))}
            {partialStar > 0 && (
              <StarIcon
                key="partial-star"
                color="#dc4848"
                size={16}
                style={{
                  fill: "#dc4848",
                  clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)`,
                }}
              />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <StarIcon key={`empty-${index}`} color="#ffffff" size={16} />
            ))}
          </div>
        </div>

        <div className="modal-body">
          <img 
            src={restaurant.photo} 
            alt={displayName} 
            className="restaurant-image"
          />
          
          {details?.formatted_address && (
            <div className="additional-details">
              <h4>Address:</h4>
              <p>{details.formatted_address}</p>
            </div>
          )}
          
          {details?.formatted_phone_number && (
            <div className="additional-details">
              <h4>Phone:</h4>
              <p>{details.formatted_phone_number}</p>
            </div>
          )}
          
          {details?.website && (
            <div className="additional-details">
              <h4>Website:</h4>
              <a href={details.website} target="_blank" rel="noopener noreferrer">
                {details.website}
              </a>
            </div>
          )}
          
          {details?.opening_hours?.weekday_text && (
            <div className="additional-details">
              <h4>Hours:</h4>
              {details.opening_hours.weekday_text.map((line, idx) => (
                <p key={`oh-${idx}`}>{line}</p>
              ))}
            </div>
          )}
          
          {loading && <p>Loading more details...</p>}
          {details?.reviews && details.reviews.length > 0 && (
            <div className="additional-details">
              <h4>User Reviews:</h4>
              {details.reviews.slice(0, 5).map((review, idx) => (
                <div key={`review-${idx}`} className="review">
                  <p>
                    <strong>{review.author_name}:</strong> {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsModal;