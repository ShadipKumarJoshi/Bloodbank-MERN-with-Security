import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const CSRFContext = createContext();

// Provider component
export const CSRFProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/form');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CSRFContext.Provider value={csrfToken}>
      {children}
    </CSRFContext.Provider>
  );
};
