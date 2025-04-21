import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">Foodi</h1>
        <p className="about-subtitle">
          Revolutionizing restaurant discovery through advanced AI-powered search technology
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Our Vision</h2>
        <p className="about-section-content">
          Foodi represents the next generation of restaurant discovery platforms, transforming how users find and experience restaurants. Our mission simplify the restaurant search for the user by finding exceptional dining experiences through intelligent, context-aware recommendations.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Technology</h2>
        <div className="about-features">
          <div className="feature-card">
            <h3 className="feature-title">Advanced Vector Search</h3>
            <p className="feature-description">
              Utilizing natural language processing and vector embeddings, our platform understands the semantic meaning behind your search queries, delivering highly relevant restaurant recommendations.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Real-Time Data Integration</h3>
            <p className="feature-description">
              Seamlessly integrated with leading restaurant data providers, ensuring up-to-date information on operating hours, menus, and customer reviews.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Personalized Experience</h3>
            <p className="feature-description">
              Our AI-driven system adapts to your individual preferences, refining recommendations to match your taste.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">How It Works</h2>
        <p className="about-section-content">
          Foodi's recommendation engine processes your search query through 
          multiple layers of analysis. Using advanced machine learning models, we convert 
          your preferences into high-dimensional vector representations, which are then 
          matched against our restaurant database. This enables us to 
          identify establishments that align not just with your explicit requirements, 
          but also with the underlying context and intent of your search.
        </p>
      </div>
    </div>
  );
};

export default About;