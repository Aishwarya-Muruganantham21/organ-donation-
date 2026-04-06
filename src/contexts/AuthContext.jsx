/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as loginDb, registerUser as registerDb, initDb } from '../utils/mockDb';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDb(); // Ensure mock db is populated with admin etc.
    const user = localStorage.getItem('current_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = loginDb(email, password);
    setCurrentUser(user);
    localStorage.setItem('current_user', JSON.stringify(user));
    return user;
  };

  const register = (userData) => {
    const user = registerDb(userData);
    setCurrentUser(user);
    localStorage.setItem('current_user', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
