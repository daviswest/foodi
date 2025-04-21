import React, { useState } from "react";
import { Star as StarIcon } from "react-feather";
import { addFavorite, removeFavorite } from "../api/favoriteService";
import RestaurantDetailsModal from "./RestaurantDetailsModal";
import { useFavorites } from '../contexts/FavoritesContext';
import "../styles/ResultsPage.css";

const ResultCard = ({ place_id, name, photo, rating, description, ...props }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [localFavorite, setLocalFavorite] = useState(isFavorite(place_id));
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - Math.ceil(rating);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      if (localFavorite) {
        await removeFavorite(place_id);
        setLocalFavorite(false);
      } else {
        await addFavorite({ place_id, name, photo, rating, description, ...props });
        setLocalFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div
        className="card"
        onClick={handleCardClick}
      >
        <div className="image-container">
          {!imageError && photo ? (
            <img
              src={photo}
              alt=""
              onError={handleImageError}
            />
          ) : (
            <div className="placeholder-image">
              <span className="placeholder-text">{name}</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="card-header">
            <h3>{name}</h3>
            <div
              className="favorite-icon"
              onClick={handleFavoriteClick}
            >
              <StarIcon
                color={localFavorite ? "#dc4848" : "#aaa"}
                style={{ fill: localFavorite ? "#dc4848" : "#aaa" }}
              />
            </div>
          </div>
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
          <p>{description}</p>
        </div>
      </div>
      {showModal && (
        <RestaurantDetailsModal restaurant={{place_id, name, photo, rating, description, ...props}} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ResultCard;