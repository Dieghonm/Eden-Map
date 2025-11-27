import React, { createContext, useState, useCallback, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';

export const JourneyContext = createContext();

export default function JourneyProvider({ children }) {
  const [cenasRespostas, setCenasRespostas] = useState([]);

  useEffect(() => {
    async function carregar() {
      const data = await getData('cenasRespostas');
      if (data) setCenasRespostas(data);
    }
    carregar();
  }, []);

  const salvarCenasRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };

      const updatedData = [...cenasRespostas, novaEntrada];
      setCenasRespostas(updatedData);
      await storeData('cenasRespostas', updatedData);
      return true;
    } catch {
      return false;
    }
  }, [cenasRespostas]);

  return (
    <JourneyContext.Provider
      value={{
        cenasRespostas,
        salvarCenasRespostas
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => {
  const context = React.useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney deve ser usado dentro de JourneyProvider');
  }
  return context;
};
