import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/auth/user');
        setUser(response.data);
      } catch (error) {
        console.log('User not logged in');
      }
    };
    checkUser();
  }, []);

  const loginOrSignup = (provider, action) => {
    const url = `http://localhost:5001/auth/${provider}?action=${action}`;
    window.location.href = url;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginOrSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };