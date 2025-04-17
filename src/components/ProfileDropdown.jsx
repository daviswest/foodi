import React, { useState, useRef, useEffect } from "react";
import { User as UserIcon } from "react-feather";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="profile-button" onClick={toggleDropdown}>
        <UserIcon color="#fff" />
      </button>
      {isDropdownOpen && (
        <div className="profile-menu" style={{padding: '0.75rem 1rem'}}>
          <div style={{color: 'black', fontWeight: '500', padding: '0.75rem 1rem', borderBottom: '0.5px solid gray', marginBottom: '.3rem'}}>
            <span>{user.email}</span>
          </div>
          <div className="profile-menu-item" onClick={() => handleNavigate("/favorites")}>
            View Favorites
          </div>
          <div className="profile-menu-item" onClick={handleLogoutClick}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;