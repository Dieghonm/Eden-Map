import React, { useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useTheme } from '../context/ThemeProvider';
import { AppContext } from '../context/AppProvider';
import { createStyles } from '../styles/HomeScreen';
import Starting from './Starting/Starting';
import Home from './Home/Home';
import Feeling from './Starting/Feeling';

export default function HomeScreen({ navigation, route }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { 
    isLoading: appLoading,
    isStartingComplete,
    resetStarting 
  } = useContext(AppContext);
  
  const [currentScreen, setCurrentScreen] = useState('LOADING');

  useEffect(() => {
    if (!appLoading) {
      if (isStartingComplete) {
        setCurrentScreen('HOME');
      } else {
        setCurrentScreen('STARTING');
      }
    }
  }, [appLoading, isStartingComplete]);

  useEffect(() => {
    if (route.params?.triggerReset) {
      handleResetStarting();
    }
  }, [route.params?.triggerReset]);

  const handleEditFeeling = () => {
    setCurrentScreen('EDIT_FEELING');
  };

  const handleFeelingComplete = () => {
    if (isStartingComplete) {
      setCurrentScreen('HOME');
    }
  };

  const handleResetStarting = async () => {
    await resetStarting();
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
        return <Home onEditFeeling={handleEditFeeling} navigation={navigation} />;
      
      case 'EDIT_FEELING':
        return <Feeling onNext={handleFeelingComplete} />;
      
      case 'STARTING':
        return <Starting onComplete={() => setCurrentScreen('HOME')} />;
      
      default:
        return <Starting onComplete={() => setCurrentScreen('HOME')} />;
    }
  };

  return (
    <View style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </View>
  );
}