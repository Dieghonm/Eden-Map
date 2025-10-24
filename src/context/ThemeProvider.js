import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, pinkTheme, darkTheme } from '../theme/colors';
import { storeData, getData } from '../utils/storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Carrega o tema salvo ao iniciar
  useEffect(() => {
    (async () => {
      const savedTheme = await getData('theme');
      if (savedTheme) setCurrentTheme(savedTheme);
    })();
  }, []);

  // Salva o tema sempre que mudar
  useEffect(() => {
    if (currentTheme) storeData('theme', currentTheme);
  }, [currentTheme]);

  const getTheme = () => {
    switch (currentTheme) {
      case 'light':
        return lightTheme;
      case 'pink':
        return pinkTheme;
      case 'dark':
        return darkTheme;
      default:
        return lightTheme;
    }
  };

  const toggleTheme = (themeName) => {
    if (['light', 'pink', 'dark'].includes(themeName)) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    theme: getTheme(),
    currentTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};