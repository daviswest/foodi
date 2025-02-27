import React, { useEffect, useState, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
import useLocation from '../hooks/useLocation';
import { fetchLocationSuggestions, getUserLocation } from '../api/locationService'; // Updated import
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
    if (searchTerm.length >= 3) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

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
    console.log("use current location in dropdown clicked");
    const userLocation = await getUserLocation();
    setLocation(userLocation);
  };

  return (
    <div style={{ position: 'relative', left: '0.2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <button ref={buttonRef} className='location-button' onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <NavigationIcon style={{ width: '1.3rem', height: '1.3rem' }} />
        <span>{locationLoading ? '' : location}</span>
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className={`dropdown-menu ${isDropdownOpen ? 'open' : 'close'}`}>
          <input
            className="location-input"
            type="text"
            placeholder="city, state, or zip"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
          />

          {isFocused && (
            <ul className='suggestions-list'>
              <li className="suggestion-item" onClick={handleUseCurrentLocation}>
                Use Current Location
              </li>
              {location ? (
                <li className="suggestion-item">Loading...</li>
              ) : error ? (
                <li className="suggestion-item error">{error}</li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
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