import React, { useEffect, useState, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
import useLocation from '../hooks/useLocation';
import { fetchLocationSuggestions, getUserLocation } from '../api/locationService';
import '../styles/LocationDropdown.css';
import NavigationIcon from '../assets/map-pin.svg?react';

const LocationDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const { location, setLocation, loading: locationLoading } = useLocation();

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      setLoading(true);
      setError(null);

      try {
        const results = await fetchLocationSuggestions(query);
        setSuggestions(results);
      } catch (err) {
        setError('Error fetching suggestions');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    if (searchTerm.length >= 0) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      inputRef.current?.focus();
      setIsFocused(true);
    }
  }, [isDropdownOpen]);

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleUseCurrentLocation = async () => {
    const userLocation = await getUserLocation();
    setLocation(userLocation);
    setIsDropdownOpen(false);
  };

  return (
    <div className="profile-dropdown" style={{borderLeft: '2px solid white', paddingLeft: '1rem'}}>
      <button ref={buttonRef} className="profile-button" onClick={() => setIsDropdownOpen(prev => !prev)} style={{display: 'flex', color: 'white', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '500'}}>
        <NavigationIcon style={{ width: '1.3rem', height: '1.3rem' }} />
        <span>{locationLoading ? '' : location}</span>
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="profile-menu left">
          <input
            ref={inputRef}
            type="text"
            className="location-input"
            placeholder="city, state, or zip"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: 'none',
              borderBottom: '1px solid #ddd',
              outline: 'none',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '0.9rem'
            }}
          />

          {isFocused && (
            <ul className="suggestions-list" style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
              <li className="profile-menu-item" onClick={handleUseCurrentLocation}>
                Use Current Location
              </li>
              {error ? (
                <li className="profile-menu-item error">{error}</li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li key={index} className="profile-menu-item" onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
