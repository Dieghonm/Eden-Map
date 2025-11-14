import React, { useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { AppContext } from '../context/AppProvider';
import { createStyles } from '../styles/HomeScreen';
import Header from './Header/Header';
import Starting from './Starting/Starting';
import Home from './Home/Home';
import Feeling from './Starting/Feeling';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // Pega os dados e status do Provider
  const { 
    isLoading: appLoading,
    isStartingComplete 
  } = useContext(AppContext);
  
  const [currentScreen, setCurrentScreen] = useState('LOADING');

  // Monitora mudanças no status de completude do Starting
  useEffect(() => {
    if (!appLoading) {
      if (isStartingComplete) {
        setCurrentScreen('HOME');
      } else {
        setCurrentScreen('STARTING');
      }
    }
  }, [appLoading, isStartingComplete]);

  const handleEditFeeling = () => {
    setCurrentScreen('EDIT_FEELING');
  };

  const handleFeelingComplete = () => {
    // Após editar, verifica novamente o status
    if (isStartingComplete) {
      setCurrentScreen('HOME');
    }
  };

  const handleResetStarting = () => {
    // Após resetar, o Provider automaticamente atualiza isStartingComplete
    // O useEffect acima vai detectar e mudar para STARTING
    setCurrentScreen('STARTING');
  };

  const renderScreen = () => {
    if (appLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.button} />
        </View>
      );
    }

    switch (currentScreen) {
      case 'HOME':
        return <Home onEditFeeling={handleEditFeeling} />;
      
      case 'EDIT_FEELING':
        return <Feeling onNext={handleFeelingComplete} />;
      
      case 'STARTING':
        return <Starting onComplete={() => setCurrentScreen('HOME')} />;
                // return <Home onEditFeeling={handleEditFeeling} />;
      
      default:
        return <Starting onComplete={() => setCurrentScreen('HOME')} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header 
        onHomePress={() => {
          if (isStartingComplete) {
            setCurrentScreen('HOME');
          }
        }} 
        onResetStarting={handleResetStarting}
      />
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}