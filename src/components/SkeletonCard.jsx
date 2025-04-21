// SkeletonCard.jsx
import React from 'react';
import '../styles/ResultsPage.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title skeleton-text"></div>
      <div className="skeleton-description skeleton-text"></div>
      <div className="skeleton-rating skeleton-text"></div>
    </div>
  );
};

export default SkeletonCard;