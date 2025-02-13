import React from 'react';
import {useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import './styles/App.css';
import Chat from './components/Chat.jsx'
import Carousel from './components/Carousel.jsx';
import { nanoid } from 'nanoid'
import FrontPageCard from './components/FrontPageCard.jsx';
import ResultsCarousel from './components/ResultsCarousel.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import './styles/FrontPageCard.css';

const mockCoffeeShopData = [
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipMmlrH3wzs7Xg5LZCEnSJdQKN_FdV72FQRriIdz=s680-w680-h510', description: 'Coffee Project New York | East Village', stars: 4.7 },
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipOmw0dxDCr__EnmivtF5QZ6q5a1CPlkljxIxGE=s680-w680-h510', description: 'Devocion', stars: 4.5 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
];

const LocationContext = createContext();

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [location, setLocation] = useState('Louisville, KY');
  const [isChatSubmit, setIsChatSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async (description, location) => {
    setIsLoading(true);
    try {
      console.log("fetching")
      const response = await fetch('http://localhost:5001/api/find-restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, location }),
      });
      const data = await response.json();
      console.log('API Response:', data);
      
      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error('error fetching the restaurants', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = (description) => {
    setIsChatSubmit(true);
    fetchRestaurants(description, location);
  };

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <Router>
      <div className="App">
          <Navbar />

          <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route 
            path="/"
            element={
              <>
          <Intro 
            restaurantDescription={restaurantDescription}
            setRestaurantDescription={setRestaurantDescription}
            handleChatSubmit={handleChatSubmit}
          />
          {isChatSubmit ? (
            isLoading ? (
              <div className="loading-animation">Loading...</div>
            ) : (
              <ResultsCarousel
                query={restaurantDescription}
                location={location}
                restaurants={restaurants}
              />
            )
          ) : (
            <>
              <Carousel 
                  title="Funky Coffee Shops in NYC"
                  coffeeShopData={mockCoffeeShopData}
              />
              <Carousel 
                  title="More Mock Data"
                  coffeeShopData={mockCoffeeShopData}
              />
              </>
          )}
          </>
            }
          />
          <Route path="/about" element={<About />}/>
          </Routes>
          
      </div>
      <Footer />
      </Router>
    </LocationContext.Provider>
  );
}

export default App;
export { LocationContext };