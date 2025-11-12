import React, { createContext, useState, useEffect, useCallback } from 'react';
import { storeData, getData, removeData } from '../utils/storage';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserState] = useState(null);
  const [desireName, setDesireNameState] = useState('');
  const [desireDescription, setDesireDescriptionState] = useState('');
  const [selectedFeelings, setSelectedFeelingsState] = useState([]);
  const [selectedPath, setSelectedPathState] = useState(null);
  const [isStartingComplete, setIsStartingComplete] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    const userData = await getData('user');
    const desireNameData = await getData('desireName');
    const desireDescData = await getData('desireDescription');
    const feelingsData = await getData('selectedFeelings');
    const pathData = await getData('selectedPath');
    setUserState(userData || null);
    setDesireNameState(desireNameData || '');
    setDesireDescriptionState(desireDescData || '');
    setSelectedFeelingsState(feelingsData || []);
    setSelectedPathState(pathData || null);
    if (!desireNameData) await storeData('desireName', '');
    if (!desireDescData) await storeData('desireDescription', '');
    if (!feelingsData) await storeData('selectedFeelings', []);
    if (!pathData) await storeData('selectedPath', null);
    setIsLoading(false);
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
  }, [desireName, desireDescription, selectedFeelings, selectedPath]);

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
