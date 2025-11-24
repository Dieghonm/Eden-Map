// src/context/AppProvider.js - ADICIONAR PROGRESSO

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
  
  // ✨ NOVO: Estado do progresso
  const [progressoJornada, setProgressoJornadaState] = useState({
    semana_atual: 1,
    dia_atual: 1,
    data_inicio: null,
    historico: []
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    
    // Carrega dados do AsyncStorage
    const userData = await getData('user');
    const desireNameData = await getData('desireName');
    const desireDescData = await getData('desireDescription');
    const feelingsData = await getData('selectedFeelings');
    const pathData = await getData('selectedPath');
    const progressoData = await getData('progressoJornada');
    
    setUserState(userData || null);
    setDesireNameState(desireNameData || '');
    setDesireDescriptionState(desireDescData || '');
    setSelectedFeelingsState(feelingsData || []);
    setSelectedPathState(pathData || null);
    
    // ✨ CARREGA PROGRESSO
    if (progressoData) {
      setProgressoJornadaState(progressoData);
    } else {
      // Se não tem local, tenta buscar do backend
      await sincronizarProgressoComBackend();
    }
    
    // Inicializa chaves vazias se não existirem
    if (!desireNameData) await storeData('desireName', '');
    if (!desireDescData) await storeData('desireDescription', '');
    if (!feelingsData) await storeData('selectedFeelings', []);
    if (!pathData) await storeData('selectedPath', null);
    if (!progressoData) await storeData('progressoJornada', {
      semana_atual: 1,
      dia_atual: 1,
      data_inicio: null,
      historico: []
    });
    
    setIsLoading(false);
  };

  // ✨ NOVO: Sincroniza progresso com backend
  const sincronizarProgressoComBackend = async () => {
    try {
      const response = await api.obterProgresso();
      
      if (response.sucesso && response.progresso) {
        const progresso = response.progresso;
        setProgressoJornadaState(progresso);
        await storeData('progressoJornada', progresso);
        console.log('✅ Progresso sincronizado com backend:', progresso);
      }
    } catch (error) {
      console.log('⚠️ Não foi possível sincronizar progresso:', error);
      // Mantém o progresso padrão local
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
  }, []);

  // ✨ NOVO: Setter do progresso
  const setProgressoJornada = useCallback(async (progresso) => {
    setProgressoJornadaState(progresso);
    await storeData('progressoJornada', progresso);
    
    // Tenta sincronizar com backend
    try {
      await api.atualizarProgresso({
        semana_atual: progresso.semana_atual,
        dia_atual: progresso.dia_atual
      });
      console.log('✅ Progresso salvo no backend');
    } catch (error) {
      console.log('⚠️ Erro ao salvar progresso no backend:', error);
    }
  }, []);

  // ✨ NOVO: Avançar dia automaticamente
  const avancarDia = useCallback(async () => {
    try {
      const response = await api.avancarDia();
      
      if (response.sucesso && response.progresso) {
        setProgressoJornadaState(response.progresso);
        await storeData('progressoJornada', response.progresso);
        console.log('✅ Dia avançado:', response.progresso);
        return response;
      } else {
        return response; // Jornada completa
      }
    } catch (error) {
      console.error('❌ Erro ao avançar dia:', error);
      
      // Fallback: avança localmente
      const { semana_atual, dia_atual } = progressoJornada;
      let novaSemana = semana_atual;
      let novoDia = dia_atual;
      
      if (dia_atual < 7) {
        novoDia += 1;
      } else if (semana_atual < 12) {
        novaSemana += 1;
        novoDia = 1;
      } else {
        return { sucesso: false, message: 'Jornada completa!' };
      }
      
      const novoProgresso = {
        ...progressoJornada,
        semana_atual: novaSemana,
        dia_atual: novoDia,
        historico: [
          ...progressoJornada.historico,
          {
            semana: novaSemana,
            dia: novoDia,
            data: new Date().toISOString(),
            acao: 'avanco_local'
          }
        ]
      };
      
      setProgressoJornadaState(novoProgresso);
      await storeData('progressoJornada', novoProgresso);
      
      return {
        sucesso: true,
        message: `Avançado para Semana ${novaSemana}, Dia ${novoDia} (offline)`,
        progresso: novoProgresso
      };
    }
  }, [progressoJornada]);

  const resetStarting = useCallback(async () => {
    const emptyName = '';
    const emptyDescription = '';
    const emptyFeelings = [];
    const emptyPath = null;
    
    setDesireNameState(emptyName);
    setDesireDescriptionState(emptyDescription);
    setSelectedFeelingsState(emptyFeelings);
    setSelectedPathState(emptyPath);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    await storeData('desireName', emptyName);
    await storeData('desireDescription', emptyDescription);
    await storeData('selectedFeelings', emptyFeelings);
    await storeData('selectedPath', emptyPath);
    
    return true;
  }, []);

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
    initializeApp,
    // ✨ NOVO: Progresso
    progressoJornada,
    setProgressoJornada,
    avancarDia,
    sincronizarProgressoComBackend,
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