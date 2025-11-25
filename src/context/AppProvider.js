// src/context/AppProvider.js - VERSÃO COM SINCRONIZAÇÃO
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
  
  // ✅ Estados separados de progresso (conforme o backend)
  const [semanaAtual, setSemanaAtual] = useState(1);
  const [diaAtual, setDiaAtual] = useState(1);
  const [progressoAtualizadoEm, setProgressoAtualizadoEm] = useState(null);

  // ============================================================================
  // INICIALIZAÇÃO
  // ============================================================================
  
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    
    try {
      // Carrega dados do AsyncStorage
      const userData = await getData('user');
      const desireNameData = await getData('desireName');
      const desireDescData = await getData('desireDescription');
      const feelingsData = await getData('selectedFeelings');
      const pathData = await getData('selectedPath');
      const semanaData = await getData('semanaAtual');
      const diaData = await getData('diaAtual');
      
      setUserState(userData || null);
      setDesireNameState(desireNameData || '');
      setDesireDescriptionState(desireDescData || '');
      setSelectedFeelingsState(feelingsData || []);
      setSelectedPathState(pathData || null);
      setSemanaAtual(semanaData || 1);
      setDiaAtual(diaData || 1);
      
      // ✅ Se tem usuário logado, sincroniza com backend
      if (userData && userData.email) {
        await sincronizarComBackend(userData.email);
      }
      
    } catch (error) {
      console.error('❌ Erro ao inicializar app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // SINCRONIZAÇÃO COM BACKEND
  // ============================================================================
  
  /**
   * ✅ Sincroniza TODOS os dados com o backend
   * Busca selected_path, test_results e progress
   */
  const sincronizarComBackend = async (email) => {
    try {
      console.log('🔄 Sincronizando dados com backend...');
      
      const response = await api.buscarDadosUsuario(email);
      
      console.log('✅ Dados recebidos do backend:', response);
      
      // Atualizar selected_path
      if (response.selected_path) {
        setSelectedPathState(response.selected_path);
        await storeData('selectedPath', response.selected_path);
      }
      
      // Atualizar progresso
      if (response.progress) {
        const { semana, dia } = response.progress;
        setSemanaAtual(semana || 1);
        setDiaAtual(dia || 1);
        await storeData('semanaAtual', semana || 1);
        await storeData('diaAtual', dia || 1);
      }
      
      // Atualizar timestamp
      setProgressoAtualizadoEm(new Date().toISOString());
      
      console.log('✅ Sincronização completa');
      
    } catch (error) {
      console.log('⚠️ Não foi possível sincronizar com backend:', error);
      // Mantém os dados locais
    }
  };

  /**
   * ✅ Sincroniza apenas o progresso
   */
  const sincronizarProgressoComBackend = async () => {
    if (!user || !user.email) {
      console.log('⚠️ Usuário não está logado, não é possível sincronizar');
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
        console.log('✅ Progresso sincronizado:', { semana, dia });
      }
      
    } catch (error) {
      console.log('⚠️ Erro ao sincronizar progresso:', error);
    }
  };

  // ============================================================================
  // VERIFICAÇÃO DE COMPLETUDE
  // ============================================================================
  
  useEffect(() => {
    const complete = 
      desireName.trim().length > 0 && 
      selectedFeelings.length === 3 && 
      selectedPath !== null;
    setIsStartingComplete(complete);
  }, [desireName, selectedFeelings, selectedPath]);

  // ============================================================================
  // SETTERS COM SINCRONIZAÇÃO
  // ============================================================================
  
  const setUser = useCallback(async (userData) => {
    setUserState(userData);
    await storeData('user', userData);
    
    // ✅ Ao fazer login, sincroniza dados
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

  /**
   * ✅ Setter do selected_path COM SINCRONIZAÇÃO
   */
  const setSelectedPath = useCallback(async (path) => {
    setSelectedPathState(path);
    await storeData('selectedPath', path);
    
    // ✅ Sincroniza com backend
    if (user && user.email && path) {
      try {
        await api.atualizarCaminho(user.email, path);
        console.log('✅ Caminho salvo no backend:', path);
      } catch (error) {
        console.log('⚠️ Erro ao salvar caminho no backend:', error);
      }
    }
  }, [user]);

  /**
   * ✅ Avançar dia COM SINCRONIZAÇÃO
   */
  const avancarDia = useCallback(async () => {
    let novaSemana = semanaAtual;
    let novoDia = diaAtual;
    
    // Lógica de avanço
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
    
    // Atualiza estado local
    setSemanaAtual(novaSemana);
    setDiaAtual(novoDia);
    setProgressoAtualizadoEm(new Date().toISOString());
    await storeData('semanaAtual', novaSemana);
    await storeData('diaAtual', novoDia);
    
    // ✅ Sincroniza com backend
    if (user && user.email) {
      try {
        await api.atualizarProgresso(user.email, novaSemana, novoDia);
        console.log('✅ Progresso salvo no backend:', { novaSemana, novoDia });
      } catch (error) {
        console.log('⚠️ Erro ao salvar progresso no backend:', error);
      }
    }
    
    return {
      sucesso: true,
      message: `Avançado para Semana ${novaSemana}, Dia ${novoDia}`
    };
  }, [semanaAtual, diaAtual, user]);

  /**
   * ✅ Reiniciar jornada COM SINCRONIZAÇÃO
   */
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
    
    // ✅ Reseta também no backend
    if (user && user.email) {
      try {
        await api.atualizarCaminho(user.email, null);
        await api.atualizarProgresso(user.email, 1, 1);
        console.log('✅ Jornada resetada no backend');
      } catch (error) {
        console.log('⚠️ Erro ao resetar jornada no backend:', error);
      }
    }
    
    return true;
  }, [user]);

  const resetUser = useCallback(async () => {
    setUserState(null);
    await removeData('user');
  }, []);

  // ============================================================================
  // PROVIDER
  // ============================================================================
  
  const value = {
    isLoading,
    user,
    setUser,
    resetUser,
    
    // Starting
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
    
    // Progresso (campos separados)
    semanaAtual,
    diaAtual,
    progressoAtualizadoEm,
    avancarDia,
    
    // Sincronização
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