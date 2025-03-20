import { useEffect, useState, createContext } from "react";
import { getCurrentUser, login, logout, refreshToken, register } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserSession();
    const interval = setInterval(() => {
      refreshToken();
    }, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const checkUserSession = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      await checkUserSession();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      await register(name, email, password);
      await handleLogin(email, password);
      return true;
    } catch (err) {
      setError(err.response?.data?.errors || ["Registration failed. Please try again."]);
      return false;
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, error }}>
      {children}
    </AuthContext.Provider>
  );
};
