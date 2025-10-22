import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme/colors';
import { createGlobalStyles } from '../theme/globalStyles';
import { storeData, getData } from '../utils/storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  const [styles, setStyles] = useState(createGlobalStyles(lightTheme));

  useEffect(() => {
    (async () => {
      const savedTheme = await getData('theme');
      if (savedTheme === 'dark') toggleTheme('dark');
    })();
  }, []);

  const toggleTheme = async (mode) => {
    const newTheme = mode === 'dark' || theme.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    setStyles(createGlobalStyles(newTheme));
    await storeData('theme', newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, styles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
