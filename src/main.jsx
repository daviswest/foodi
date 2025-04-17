import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LocationProvider } from './contexts/LocationContext';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
      <LocationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocationProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>,
);
