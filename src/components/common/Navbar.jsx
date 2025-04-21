import React, { useState } from "react";
import "../../styles/Navbar.css";
import Menu from "../../assets/menu.svg?react";
import { X as XIcon } from "react-feather";
import { useNavigate } from "react-router-dom";
import LocationDropdown from "../LocationDropdown";
import ProfileDropdown from "../ProfileDropdown";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleKeyPress = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNavigate(path);
    }
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="horizontal-elements">
          <div 
            className="logo-navbar" 
            onClick={() => handleNavigate("/")}
            onKeyPress={(e) => handleKeyPress(e, "/")}
            role="button"
            tabIndex="0"
            aria-label="Foodi home"
          >
            foodi
          </div>
          <div className="menu-toggler desktop-only">
            <LocationDropdown />
          </div>
        </div>

        <div className="horizontal-elements">
          {user ? (
            <div className="menu-toggler desktop-only">
              <ProfileDropdown user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <button 
                className="login-button" 
                onClick={() => navigate("/login")}
                aria-label="Log in to your account"
              >
                Log in
              </button>
              <button 
                className="register-button" 
                onClick={() => navigate("/signup")}
                aria-label="Create a new account"
              >
                Sign Up
              </button>
            </div>
          )}
          <button 
            className="menu-toggler" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {!isMenuOpen ? <Menu /> : <XIcon size={20}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={toggleMenu}
          role="presentation"
        />
      )}

      <div 
        id="mobile-menu"
        className={`navigation-container ${isMenuOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <button 
          className="close-button" 
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <XIcon size={20}/>
        </button>

        <ul className="navigation-list primary-links" role="menubar">
          <li 
            className="navigation-list-items" 
            onClick={() => handleNavigate("/")}
            onKeyPress={(e) => handleKeyPress(e, "/")}
            role="menuitem"
            tabIndex="0"
          >
            Home
          </li>
          {user ? (
            <>
              <li 
                className="navigation-list-items" 
                onClick={() => handleNavigate("/favorites")}
                onKeyPress={(e) => handleKeyPress(e, "/favorites")}
                role="menuitem"
                tabIndex="0"
              >
                View Favorites
              </li>
            </>
          ) : (
            <li 
              className="navigation-list-items" 
              onClick={() => handleNavigate("/about")}
              onKeyPress={(e) => handleKeyPress(e, "/about")}
              role="menuitem"
              tabIndex="0"
            >
              About
            </li>
          )}
        </ul>

        <div className="auth-section">
          {user ? (
            <button 
              className="auth-button login" 
              onClick={handleLogout}
              aria-label="Log out of your account"
            >
              Logout
            </button>
          ) : (
            <>
              <button 
                className="auth-button login" 
                onClick={() => handleNavigate("/login")}
                aria-label="Log in to your account"
              >
                Log in
              </button>
              <button 
                className="auth-button signup" 
                onClick={() => handleNavigate("/signup")}
                aria-label="Create a new account"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
