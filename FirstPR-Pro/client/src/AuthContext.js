import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('mock_user') || '');

  useEffect(() => {
    if (user) {
      localStorage.setItem('mock_user', user);
    } else {
      localStorage.removeItem('mock_user');
    }
  }, [user]);

  const login = (username) => {
    if (username && username.trim()) {
      setUser(username.trim());
    }
  };

  const logout = () => {
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
