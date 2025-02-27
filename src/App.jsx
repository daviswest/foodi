import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Card from './components/Card';
import Intro from './components/Intro';
import './styles/App.css';
import Carousel from './components/Carousel.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import Footer from './components/common/Footer.jsx';
import About from './components/About.jsx';
import './styles/FrontPageCard.css';
import useLocation from './hooks/useLocation.jsx';
import { nanoid } from 'nanoid';

const mockCoffeeShopData = [
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipMmlrH3wzs7Xg5LZCEnSJdQKN_FdV72FQRriIdz=s680-w680-h510', description: 'Coffee Project New York | East Village', stars: 4.7 },
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipOmw0dxDCr__EnmivtF5QZ6q5a1CPlkljxIxGE=s680-w680-h510', description: 'Devocion', stars: 4.5 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipMmlrH3wzs7Xg5LZCEnSJdQKN_FdV72FQRriIdz=s680-w680-h510', description: 'Coffee Project New York | East Village', stars: 4.7 },
  { id: nanoid(), image: 'https://lh3.googleusercontent.com/p/AF1QipOmw0dxDCr__EnmivtF5QZ6q5a1CPlkljxIxGE=s680-w680-h510', description: 'Devocion', stars: 4.5 },
  { id: nanoid(), image: 'https://fastly.4sqi.net/img/general/600x600/86226073_eHfUgSjNjOWVbq3sKPJH3Yv7W_HfDYkO5dYzW5FnVJU.jpg', description: 'Ludlow Coffee', stars: 4.8 },
];

function App() {
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const { location } = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<ResultsPage/>} />
        <Route path="/" element={
          <>
            <Intro 
              restaurantDescription={restaurantDescription}
              setRestaurantDescription={setRestaurantDescription}
              location={location}
            />
            <>
            <Carousel title="Funky Coffee Shops in New York, NY" data={mockCoffeeShopData} CardComponent={Card} />
            <Carousel title="Funky Coffee Shops in New York, NY" data={mockCoffeeShopData} CardComponent={Card} />
            </>
          </>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
