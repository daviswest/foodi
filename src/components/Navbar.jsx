import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';
import Menu from '../assets/menu.svg?react';
import menuCloseIcon from '../assets/x.svg';
import { useNavigate } from 'react-router-dom';
import LocationDropdown from './LocationDropdown';

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const inputRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
      <>
      <nav className="navbar">
        <div className="horizontal-elements">
          <div className="logo-navbar" onClick={()=>navigate("/")}>foodi</div>
          <LocationDropdown
            setLocation={props.setLocation}
            location={props.location}
          />
        </div>
        {!isMenuOpen && (
          <button className="menu-toggler" onClick={toggleMenu}><Menu /></button>
        )
        }
        <div className="desktop-navigation">
          <ul className="navigation-list">
            <li className="navigation-list-items">
              <button className="login-button" onClick={()=>navigate("/login")}>Log in</button>
            </li>
            <li className="navigation-list-items">
              <button className="register-button" href="/register" onClick={()=>navigate("/signup")}>Sign Up</button>
            </li>
          </ul>
        </div>
        
      </nav>
      {isMenuOpen && (
        <div className="navigation-container">
          <button className="menu-close" onClick={toggleMenu}><img src={menuCloseIcon} alt="Menu Close"/></button>
          <ul className='navigation-list'>
            <li className='navigation-list-items'><a href="/">Home</a></li>
            <li className='navigation-list-items'><a href="/about">About</a></li>
            <li className='navigation-list-items'><a href="/services">Services</a></li>
            <li className='navigation-list-items'><a href="/contact">Contact</a></li>
          </ul>
        </div>
      )}
      </>
  );
};

export default Navbar;
