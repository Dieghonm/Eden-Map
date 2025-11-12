import React, { createContext, useState, useEffect } from 'react';
import { storeData, getData, removeData } from '../utils/storage';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // ========== DADOS DO USUÁRIO ==========
  const [user, setUser] = useState(null);

  // ========== DADOS DO STARTING ==========
  const [desireName, setDesireName] = useState('');
  const [desireDescription, setDesireDescription] = useState('');
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isStartingComplete, setIsStartingComplete] = useState(false);

  // ========== CARREGA DADOS AO INICIAR ==========
  useEffect(() => {
    loadAllData();
  }, []);

  // ========== SALVA USUÁRIO QUANDO MUDAR ==========
  useEffect(() => {
    if (user !== null) storeData('user', user);
  }, [user]);

  // ========== VERIFICA SE STARTING ESTÁ COMPLETO ==========
  useEffect(() => {
    checkIfStartingComplete();
  }, [desireName, selectedFeelings, selectedPath]);

  // ========== FUNÇÕES DE CARREGAMENTO ==========
  const loadAllData = async () => {
    try {
      // Carrega usuário
      const storedUser = await getData('user');
      if (storedUser) setUser(storedUser);

      // Carrega dados do Starting
      const savedDesireName = await getData('desireName');
      const savedDesireDescription = await getData('desireDescription');
      const savedFeelings = await getData('selectedFeelings');
      const savedPath = await getData('selectedPath');

      if (savedDesireName) setDesireName(savedDesireName);
      if (savedDesireDescription) setDesireDescription(savedDesireDescription);
      if (savedFeelings) setSelectedFeelings(savedFeelings);
      if (savedPath) setSelectedPath(savedPath);

      console.log('✅ Todos os dados carregados do AppProvider');
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
    }
  };

  const checkIfStartingComplete = () => {
    const complete = 
      desireName.trim().length > 0 && 
      selectedFeelings.length === 3 && 
      selectedPath !== null;
    
    setIsStartingComplete(complete);
  };

  // ========== FUNÇÕES DE SALVAMENTO - STARTING ==========
  const saveDesireName = async (name) => {
    try {
      await storeData('desireName', name);
      setDesireName(name);
      console.log('✅ Nome do desejo salvo:', name);
    } catch (error) {
      console.error('❌ Erro ao salvar nome do desejo:', error);
    }
  };

  const saveDesireDescription = async (description) => {
    try {
      await storeData('desireDescription', description);
      setDesireDescription(description);
      console.log('✅ Descrição do desejo salva');
    } catch (error) {
      console.error('❌ Erro ao salvar descrição:', error);
    }
  };

  const saveSelectedFeelings = async (feelings) => {
    try {
      await storeData('selectedFeelings', feelings);
      setSelectedFeelings(feelings);
      console.log('✅ Sentimentos salvos:', feelings);
    } catch (error) {
      console.error('❌ Erro ao salvar sentimentos:', error);
    }
  };

  const saveSelectedPath = async (path) => {
    try {
      await storeData('selectedPath', path);
      setSelectedPath(path);
      console.log('✅ Caminho salvo:', path);
    } catch (error) {
      console.error('❌ Erro ao salvar caminho:', error);
    }
  };

  // ========== FUNÇÃO DE RESET ==========
  const resetStarting = async () => {
    try {
      await removeData('desireName');
      await removeData('desireDescription');
      await removeData('selectedFeelings');
      await removeData('selectedPath');

      setDesireName('');
      setDesireDescription('');
      setSelectedFeelings([]);
      setSelectedPath(null);
      setIsStartingComplete(false);

      console.log('✅ Dados do Starting resetados');
    } catch (error) {
      console.error('❌ Erro ao resetar dados:', error);
    }
  };

  // ========== VALUE DO CONTEXTO ==========
  const value = {
    // Dados do usuário
    user,
    setUser,

    // Dados do Starting
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    isStartingComplete,

    // Funções de salvamento
    saveDesireName,
    saveDesireDescription,
    saveSelectedFeelings,
    saveSelectedPath,

    // Funções auxiliares
    resetStarting,
    loadAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ========== EXEMPLOS DE USO ==========

/*
// ===============================================
// 1. DESIRE.JS - Salvar desejo
// ===============================================
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

export default function Desire({ onNext }) {
  const { saveDesireName, saveDesireDescription } = useContext(AppContext);
  const [localName, setLocalName] = useState('');
  const [localDescription, setLocalDescription] = useState('');

  const handleNext = async () => {
    await saveDesireName(localName.trim());
    await saveDesireDescription(localDescription.trim());
    onNext();
  };

  // ... resto do código
}

// ===============================================
// 2. FEELING.JS - Salvar sentimentos
// ===============================================
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

export default function Feeling({ onNext }) {
  const { saveSelectedFeelings } = useContext(AppContext);
  const [localFeelings, setLocalFeelings] = useState([]);

  const handleNext = async () => {
    await saveSelectedFeelings(localFeelings);
    onNext();
  };

  // ... resto do código
}

// ===============================================
// 3. TRACK.JS - Salvar caminho
// ===============================================
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

export default function Track({ onComplete }) {
  const { saveSelectedPath } = useContext(AppContext);
  const [localPath, setLocalPath] = useState(null);

  const handleComplete = async () => {
    await saveSelectedPath(localPath);
    onComplete();
  };

  // ... resto do código
}

// ===============================================
// 4. HOME.JS - Ler dados salvos
// ===============================================
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { SENTIMENTOS, CAMINHOS } from '../../../assets/json/Sentimentos';

export default function Home({ onEditFeeling }) {
  const { 
    desireName, 
    desireDescription,
    selectedFeelings, 
    selectedPath 
  } = useContext(AppContext);

  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  const getSelectedPath = () => {
    return CAMINHOS.find(c => c.id === selectedPath);
  };

  // ... resto do código
}

// ===============================================
// 5. HEADER.JS - Resetar tudo
// ===============================================
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { Alert } from 'react-native';

export default function Header({ onResetStarting }) {
  const { resetStarting } = useContext(AppContext);

  const handleResetStarting = () => {
    Alert.alert(
      'Reiniciar Jornada',
      'Isso irá apagar seu desejo, sentimentos e caminho. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            await resetStarting();
            if (onResetStarting) onResetStarting();
            Alert.alert('Sucesso', 'Dados apagados!');
          }
        }
      ]
    );
  };

  // ... resto do código
}

// ===============================================
// 6. HOMESCREEN.JS - Verificar se Starting está completo
// ===============================================
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';

export default function HomeScreen({ navigation }) {
  const { isStartingComplete } = useContext(AppContext);
  const [currentScreen, setCurrentScreen] = useState('LOADING');

  useEffect(() => {
    if (isStartingComplete) {
      setCurrentScreen('HOME');
    } else {
      setCurrentScreen('STARTING');
    }
  }, [isStartingComplete]);

  // ... resto do código
}
*/
