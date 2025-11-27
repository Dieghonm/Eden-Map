import React, { createContext, useState, useEffect, useCallback } from 'react';
import { storeData, getData, removeData } from '../utils/storage';
import { api } from '../services/api';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserState] = useState(null);
  const [desireName, setDesireNameState] = useState('');
  const [desireDescription, setDesireDescriptionState] = useState('');
  const [selectedFeelings, setSelectedFeelingsState] = useState([]);
  const [selectedPath, setSelectedPathState] = useState(null);
  const [isStartingComplete, setIsStartingComplete] = useState(false);
  const [semanaAtual, setSemanaAtual] = useState(1);
  const [diaAtual, setDiaAtual] = useState(1);
  const [progressoAtualizadoEm, setProgressoAtualizadoEm] = useState(null);
  const [statusDias, setStatusDias] = useState({});

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    
    try {
      const userData = await getData('user');
      const desireNameData = await getData('desireName');
      const desireDescData = await getData('desireDescription');
      const feelingsData = await getData('selectedFeelings');
      const pathData = await getData('selectedPath');
      const semanaData = await getData('semanaAtual');
      const diaData = await getData('diaAtual');
      const diasData = await getData('statusDias');
      
      setUserState(userData || null);
      setDesireNameState(desireNameData || '');
      setDesireDescriptionState(desireDescData || '');
      setSelectedFeelingsState(feelingsData || []);
      setSelectedPathState(pathData || null);
      setSemanaAtual(semanaData || 1);
      setDiaAtual(diaData || 1);
      setStatusDias(diasData || {});

      if (userData && userData.email) {
        await sincronizarComBackend(userData.email);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const sincronizarComBackend = async (email) => {
    try {
      const response = await api.buscarDadosUsuario(email);
      if (response.selected_path) {
        setSelectedPathState(response.selected_path);
        await storeData('selectedPath', response.selected_path);
      }
      if (response.progress) {
        const { semana, dia } = response.progress;
        setSemanaAtual(semana || 1);
        setDiaAtual(dia || 1);
        await storeData('semanaAtual', semana || 1);
        await storeData('diaAtual', dia || 1);
      }
      setProgressoAtualizadoEm(new Date().toISOString());
    } catch {}
  };

  const sincronizarProgressoComBackend = async () => {
    if (!user || !user.email) return;
    try {
      const response = await api.buscarDadosUsuario(user.email);
      if (response.progress) {
        const { semana, dia } = response.progress;
        setSemanaAtual(semana || 1);
        setDiaAtual(dia || 1);
        await storeData('semanaAtual', semana || 1);
        await storeData('diaAtual', dia || 1);
        setProgressoAtualizadoEm(new Date().toISOString());
      }
    } catch {}
  };

  useEffect(() => {
    const complete = 
      desireName.trim().length > 0 && 
      selectedFeelings.length === 3 && 
      selectedPath !== null;
    setIsStartingComplete(complete);
  }, [desireName, selectedFeelings, selectedPath]);

  const setUser = useCallback(async (userData) => {
    setUserState(userData);
    await storeData('user', userData);
    if (userData && userData.email) {
      await sincronizarComBackend(userData.email);
    }
  }, []);

  const setDesireName = useCallback(async (name) => {
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    setDesireNameState(trimmedName);
    await storeData('desireName', trimmedName);
  }, []);

  const setDesireDescription = useCallback(async (description) => {
    const trimmedDesc = typeof description === 'string' ? description.trim() : '';
    setDesireDescriptionState(trimmedDesc);
    await storeData('desireDescription', trimmedDesc);
  }, []);

  const setSelectedFeelings = useCallback(async (feelings) => {
    const valid = Array.isArray(feelings) ? feelings : [];
    setSelectedFeelingsState(valid);
    await storeData('selectedFeelings', valid);
  }, []);

  const setSelectedPath = useCallback(async (path) => {
    setSelectedPathState(path);
    await storeData('selectedPath', path);
    if (user && user.email && path) {
      try {
        await api.atualizarCaminho(user.email, path);
      } catch {}
    }
  }, [user]);

  const avancarDia = useCallback(async () => {
    let novaSemana = semanaAtual;
    let novoDia = diaAtual;
    if (diaAtual < 7) {
      novoDia = diaAtual + 1;
    } else if (semanaAtual < 12) {
      novaSemana = semanaAtual + 1;
      novoDia = 1;
    } else {
      return { sucesso: false, message: '🎉 Parabéns! Você completou toda a jornada!' };
    }
    
    setSemanaAtual(novaSemana);
    setDiaAtual(novoDia);
    setProgressoAtualizadoEm(new Date().toISOString());
    await storeData('semanaAtual', novaSemana);
    await storeData('diaAtual', novoDia);
    
    if (user && user.email) {
      try {
        await api.atualizarProgresso(user.email, novaSemana, novoDia);
      } catch {}
    }
    
    return { sucesso: true, message: `Avançado para Semana ${novaSemana}, Dia ${novoDia}` };
  }, [semanaAtual, diaAtual, user]);

  const resetStarting = useCallback(async () => {
    setDesireNameState('');
    setDesireDescriptionState('');
    setSelectedFeelingsState([]);
    setSelectedPathState(null);
    setSemanaAtual(1);
    setDiaAtual(1);
    
    await storeData('desireName', '');
    await storeData('desireDescription', '');
    await storeData('selectedFeelings', []);
    await storeData('selectedPath', null);
    await storeData('semanaAtual', 1);
    await storeData('diaAtual', 1);
    
    if (user && user.email) {
      try {
        await api.atualizarCaminho(user.email, null);
        await api.atualizarProgresso(user.email, 1, 1);
      } catch {}
    }
    
    return true;
  }, [user]);

  const resetUser = useCallback(async () => {
    setUserState(null);
    await removeData('user');
  }, []);

  const value = {
    isLoading,
    user,
    setUser,
    resetUser,

    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    isStartingComplete,
    setDesireName,
    setDesireDescription,
    setSelectedFeelings,
    setSelectedPath,
    resetStarting,

    semanaAtual,
    diaAtual,
    progressoAtualizadoEm,
    avancarDia,

    statusDias,

    sincronizarComBackend,
    sincronizarProgressoComBackend,
    initializeApp,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};
