import { useEffect, useState, createContext, useContext } from "react";
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
      return true;
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

  const value = {
    user,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
