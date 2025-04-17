import React, { useState } from "react";
import { Star as StarIcon } from "react-feather";
import { addFavorite, removeFavorite } from "../api/favoriteService";
import RestaurantDetailsModal from "./RestaurantDetailsModal";
import { useFavorites } from '../contexts/FavoritesContext';
import "../styles/FrontPageCard.css";

const ResultCard = ({ place_id, ...props }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [localFavorite, setLocalFavorite] = useState(isFavorite(place_id));
  const [showModal, setShowModal] = useState(false);

  const fullStars = Math.floor(props.stars);
  const partialStar = props.stars % 1;
  const emptyStars = 5 - Math.ceil(props.stars);

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
        await addFavorite({ place_id, name, photo: image });
        setLocalFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="card"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={props.image}
          alt={`Image of ${props.name}`}
          style={{
            height: "10rem",
            borderRadius: "1rem 1rem 0 0",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{props.name}</h3>
            <div
              className="favorite-icon"
              onClick={handleFavoriteClick}
              style={{ cursor: "pointer" }}
            >
              <StarIcon
                color={localFavorite ? "#dc4848" : "#aaa"}
                style={{ fill: localFavorite ? "#dc4848" : "#aaa" }}
                onClick={handleFavoriteClick}
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
          <p>{props.description}</p>
        </div>
      </div>
      {showModal && (
        <RestaurantDetailsModal restaurant={{place_id, ...props}} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ResultCard;