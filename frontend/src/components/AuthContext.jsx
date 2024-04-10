import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    

    window.location.href = '/';
  };
  const value = {
    isLoggedIn,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
