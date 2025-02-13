import React, { useCallback, useEffect, useState, forwardRef, useRef, useContext } from 'react';
import debounce from 'lodash/debounce';
import { LocationContext } from '../App';

import '../styles/LocationDropdown.css'
import NavigationIcon from '../assets/map-pin.svg?react';
const LocationDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(null)
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const {location, setLocation} = useContext(LocationContext)
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.length < 3) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5001/api/get-location-suggestions?q=${query}`);
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setError(data.error);
          setSuggestions([]);
        } else {
          setSuggestions(data.predictions || []);
        }
      } catch (err) {
        setError('Error fetching suggestions');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(()=> {
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
  }, [isDropdownOpen, setIsDropdownOpen]);

  useEffect(()=>{
    if(isDropdownOpen){
      inputRef.current?.focus();
      setIsFocused(true);
    }
  }, [isDropdownOpen])

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => setError('Unable to fetch location')
      );
    } else {
      setError('Geolocation is not supported');
    }
  };

  const handleClick = () => {
    setIsDropdownOpen((prev)=>!prev);
  };

  return (
    <div style={{position: 'relative', left: '0.2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
    <button ref={buttonRef} className='location-button' onClick={handleClick}>
        <NavigationIcon style={{ width: '1.3rem', height: '1.3rem' }}/>
        <span>{location}</span>
    </button> 
    {isDropdownOpen &&
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
            <li className="suggestion-item" onClick={handleUseCurrentLocation}>Use Current Location</li>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
    </div>
    }
    </div>
  );
};

export default LocationDropdown;
