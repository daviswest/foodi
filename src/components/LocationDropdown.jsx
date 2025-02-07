import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
const LocationDropdown = (props) => {

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          props.setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(props.location.latitude)
          console.log(props.location.longitude)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className='dropdown-menu'>
      <div>
        <p style={{color: 'white'}}>Your location is set to {props.location.latitude} {props.location.longitude}</p>
      </div>
      <div>
        <button className='login-button'>Update</button>
      </div>
    </div>  
  );
};

export default LocationDropdown