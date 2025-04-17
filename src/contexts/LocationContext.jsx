import React, { createContext, useState, useEffect } from 'react';
import { getUserLocation } from '../api/locationService';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(null);

  const updateLocation = (newLocation) => {
      console.log("Setting location to:", newLocation);
      setLocation(newLocation);
  }

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const userLocation = await getUserLocation();
        console.log('Location fetched:', userLocation);
        updateLocation(userLocation);
      } catch (error) {
        console.error('Location fetch error:', error);
        updateLocation(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation: updateLocation, loading }}>
      {children}
    </LocationContext.Provider>
  );
};