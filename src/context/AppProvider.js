import React, { createContext, useState, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega o usuário salvo ao iniciar o app
  useEffect(() => {
    (async () => {
      const storedUser = await getData('user');
      if (storedUser) setUser(storedUser);
    })();
  }, []);

  // Salva o usuário sempre que mudar
  useEffect(() => {
    if (user !== null) storeData('user', user);
  }, [user]);

  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
