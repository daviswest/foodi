import React, { useState } from 'react';
import '../../styles/Navbar.css';
import Menu from '../../assets/menu.svg?react';
import menuCloseIcon from '../../assets/x.svg';
import { useNavigate } from 'react-router-dom';
import LocationDropdown from '../LocationDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <div className="horizontal-elements">
          <div className="logo-navbar" onClick={() => navigate("/")}>foodi</div>
          <LocationDropdown />
        </div>

        {!isMenuOpen && (
          <button className="menu-toggler" onClick={toggleMenu}>
            <Menu />
          </button>
        )}

        <div className="desktop-navigation">
          <ul className="navigation-list">
            <li className="navigation-list-items">
              <button className="login-button" onClick={() => navigate("/login")}>Log in</button>
            </li>
            <li className="navigation-list-items">
              <button className="register-button" onClick={() => navigate("/signup")}>Sign Up</button>
            </li>
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="navigation-container">
          <button className="menu-close" onClick={toggleMenu}>
            <img src={menuCloseIcon} alt="Menu Close" />
          </button>
          <ul className='navigation-list'>
            <li className='navigation-list-items' onClick={() => navigate("/")}>Home</li>
            <li className='navigation-list-items' onClick={() => navigate("/about")}>About</li>
            <li className='navigation-list-items' onClick={() => navigate("/services")}>Services</li>
            <li className='navigation-list-items' onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
