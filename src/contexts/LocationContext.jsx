import React, { createContext, useState, useEffect } from 'react';
import { getUserLocation } from '../api/locationApi';

import axios from 'axios';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    const fetchLocation = async () => {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
