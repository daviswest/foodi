import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import Menu from '../assets/menu.svg?react';
import menuCloseIcon from '../assets/x.svg';
import NavigationIcon from '../assets/map-pin.svg?react';
import { useNavigate } from 'react-router-dom';
import LocationDropdown from './LocationDropdown';

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
      <>
      <nav className="navbar">
        <div className="horizontal-elements">
          <div className="logo-navbar" onClick={()=>navigate("/")}>foodi</div>
          <span style={{color: 'white'}}>|</span>
          <div style={{position: 'relative'}} onMouseEnter={()=>setIsDropdownOpen(true)} onMouseLeave={()=>setIsDropdownOpen(false)}>
            <button className='location-button'>
              <NavigationIcon className='location-button' style={{ marginRight: '0.3rem', width: '1.3rem', height: '1.3rem' }}/>
            </button>     
            {isDropdownOpen && (
              <LocationDropdown
                setLocation={props.setLocation}
                location={props.location}
              />
            )}
          </div>
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
