// SkeletonCard.jsx
import React from 'react';
import '../styles/FrontPageCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-text skeleton-title" />
      <div className="skeleton-text skeleton-description" />
      <div className="skeleton-text skeleton-rating" />
    </div>
  );
};

export default SkeletonCard;