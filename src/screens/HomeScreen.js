import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/HomeScreen';
import { getData } from '../utils/storage';
import Header from './Header/Header';
import Starting from './Starting/Starting';
import Home from './Home/Home';
import Feeling from './Starting/Feeling';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [currentScreen, setCurrentScreen] = useState('LOADING');
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    checkGuideStatus();
  }, []);

  const checkGuideStatus = async () => {
    try {
      const desireName = await getData('desireName');
      const selectedFeelings = await getData('selectedFeelings');
      const selectedPath = await getData('selectedPath');

      // Se todos os dados existem, mostra a Home
      if (desireName && selectedFeelings && selectedPath) {
        setShowHome(true);
        setCurrentScreen('HOME');
      } else {
        setShowHome(false);
        setCurrentScreen('STARTING');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
      setShowHome(false);
      setCurrentScreen('STARTING');
    }
  };

  const handleEditFeeling = () => {
    setCurrentScreen('EDIT_FEELING');
  };

  const handleFeelingComplete = () => {
    checkGuideStatus();
  };

  const handleResetStarting = () => {
    setCurrentScreen('STARTING');
    checkGuideStatus();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <Home onEditFeeling={handleEditFeeling} />;
      
      case 'EDIT_FEELING':
        return <Feeling onNext={handleFeelingComplete} />;
      
      case 'STARTING':
        return <Starting onComplete={checkGuideStatus} />;
      
      default:
        return <Starting onComplete={checkGuideStatus} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header 
        onHomePress={() => setCurrentScreen('HOME')} 
        onResetStarting={handleResetStarting}
      />
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}
