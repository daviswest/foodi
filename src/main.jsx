import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LocationProvider } from './contexts/LocationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocationProvider>
  </StrictMode>,
);
