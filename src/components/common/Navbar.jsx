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

  return (
    <>
      <nav className="navbar">
        <div className="horizontal-elements">
          <div className="logo-navbar" onClick={() => handleNavigate("/")}>
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
              <button className="login-button" onClick={() => navigate("/login")}>
                Log in
              </button>
              <button className="register-button" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          )}
          <button className="menu-toggler" onClick={toggleMenu}>
            {!isMenuOpen ? <Menu /> : <XIcon size={20}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="mobile-menu-backdrop" onClick={toggleMenu}></div>}

      <div className={`navigation-container ${isMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          <XIcon size={20}/>
        </button>

        <ul className="navigation-list primary-links">
          <li className="navigation-list-items" onClick={() => handleNavigate("/")}>
            Home
          </li>
          {user ? (
            <>
          <li className="navigation-list-items" onClick={() => handleNavigate("/favorites")}>
            View Favorites
          </li>
          </>
          ) : (
            <li className="navigation-list-items" onClick={() => handleNavigate("/about")}>
              About
            </li>
          )}
        </ul>

        <div className="auth-section">
          {user ? (
              <div className="auth-button login" onClick={handleLogout}>
                Logout
              </div>
          ) : (
            <>
              <button className="auth-button login" onClick={() => handleNavigate("/login")}>
                Log in
              </button>
              <button className="auth-button signup" onClick={() => handleNavigate("/signup")}>
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
