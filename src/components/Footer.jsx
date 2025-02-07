import React from 'react';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo" onClick={()=>navigate("/")}>foodi</div>
        <div className="footer-links">
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
