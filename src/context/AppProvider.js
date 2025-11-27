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
  const [cenasRespostas, setCenasRespostas] = useState([]);
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
      const cenasData = await getData('cenasRespostas');
      const diasData = await getData('statusDias');
      
      setUserState(userData || null);
      setDesireNameState(desireNameData || '');
      setDesireDescriptionState(desireDescData || '');
      setSelectedFeelingsState(feelingsData || []);
      setSelectedPathState(pathData || null);
      setSemanaAtual(semanaData || 1);
      setDiaAtual(diaData || 1);
      setCenasRespostas(cenasData || []);
      setStatusDias(diasData || {});
      
      if (userData && userData.email) {
        await sincronizarComBackend(userData.email);
      }
      
    } catch (error) {
      console.error('❌ Erro ao inicializar app:', error);
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
   
    } catch (error) {
    }
  };

  const sincronizarProgressoComBackend = async () => {
    if (!user || !user.email) {
      return;
    }
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

    } catch (error) {
    }
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
    const validFeelings = Array.isArray(feelings) ? feelings : [];
    setSelectedFeelingsState(validFeelings);
    await storeData('selectedFeelings', validFeelings);
  }, []);

  const setSelectedPath = useCallback(async (path) => {
    setSelectedPathState(path);
    await storeData('selectedPath', path);

    if (user && user.email && path) {
      try {
        await api.atualizarCaminho(user.email, path);
      } catch (error) {
      }
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
      return {
        sucesso: false,
        message: '🎉 Parabéns! Você completou toda a jornada!'
      };
    }
    
    setSemanaAtual(novaSemana);
    setDiaAtual(novoDia);
    setProgressoAtualizadoEm(new Date().toISOString());
    await storeData('semanaAtual', novaSemana);
    await storeData('diaAtual', novoDia);
    
    if (user && user.email) {
      try {
        await api.atualizarProgresso(user.email, novaSemana, novoDia);
      } catch (error) {
      }
    }
    
    return {
      sucesso: true,
      message: `Avançado para Semana ${novaSemana}, Dia ${novoDia}`
    };
  }, [semanaAtual, diaAtual, user]);

  const resetStarting = useCallback(async () => {
    const emptyName = '';
    const emptyDescription = '';
    const emptyFeelings = [];
    const emptyPath = null;
    
    setDesireNameState(emptyName);
    setDesireDescriptionState(emptyDescription);
    setSelectedFeelingsState(emptyFeelings);
    setSelectedPathState(emptyPath);
    setSemanaAtual(1);
    setDiaAtual(1);
    
    await storeData('desireName', emptyName);
    await storeData('desireDescription', emptyDescription);
    await storeData('selectedFeelings', emptyFeelings);
    await storeData('selectedPath', emptyPath);
    await storeData('semanaAtual', 1);
    await storeData('diaAtual', 1);
    
    if (user && user.email) {
      try {
        await api.atualizarCaminho(user.email, null);
        await api.atualizarProgresso(user.email, 1, 1);
      } catch (error) {
      }
    }
    
    return true;
  }, [user]);

  const resetUser = useCallback(async () => {
    setUserState(null);
    await removeData('user');
  }, []);

  const salvarCenasRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const existingData = cenasRespostas || [];
      
      const novaEntrada = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };
      
      const filteredData = existingData.filter(
        entry => entry.semana !== semana || entry.path !== path
      );
      
      const updatedData = [...filteredData, novaEntrada];
      
      setCenasRespostas(updatedData);
      await storeData('cenasRespostas', updatedData);
      
      return true;
    } catch (error) {
      return false;
    }
  }, [cenasRespostas]);

  const carregarStatusDia = useCallback(async (semana, dia) => {
    try {
      const key = `${semana}_${dia}`;
      const statusData = await getData('statusDias');
      
      if (statusData && statusData[key]) {
        setStatusDias(prev => ({
          ...prev,
          [key]: statusData[key]
        }));
      }
    } catch (error) {
    }
  }, []);

  const salvarStatusDia = useCallback(async (semana, dia, novoStatus) => {
    try {
      const key = `${semana}_${dia}`;
      const statusAtualizado = {
        ...statusDias,
        [key]: {
          ...statusDias[key],
          ...novoStatus,
          updatedAt: new Date().toISOString()
        }
      };
      
      setStatusDias(statusAtualizado);
      await storeData('statusDias', statusAtualizado);
      
      return true;
    } catch (error) {
      return false;
    }
  }, [statusDias]);

  const marcarExercicioConcluido = useCallback(async (semana, tipoExercicio) => {
    try {
      const dia = diaAtual;
      await salvarStatusDia(semana, dia, {
        exercicioConcluido: true,
        meditacaoLiberada: true,
        tipoExercicio,
        completedAt: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      return false;
    }
  }, [diaAtual, salvarStatusDia]);

  const marcarMeditacaoConcluida = useCallback(async (semana, dia) => {
    try {
      await salvarStatusDia(semana, dia, {
        meditacaoConcluida: true,
        meditacaoCompletedAt: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      return false;
    }
  }, [salvarStatusDia]);

  const buscarCenasResposta = useCallback((semana, path) => {
    return cenasRespostas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [cenasRespostas]);

  const buscarStatusDia = useCallback((semana, dia) => {
    const key = `${semana}_${dia}`;
    return statusDias[key] || {
      exercicioConcluido: false,
      meditacaoLiberada: false,
      meditacaoConcluida: false,
    };
  }, [statusDias]);

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

    cenasRespostas,
    statusDias,
    salvarCenasRespostas,
    carregarStatusDia,
    salvarStatusDia,
    marcarExercicioConcluido,
    marcarMeditacaoConcluida,
    buscarCenasResposta,
    buscarStatusDia,

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