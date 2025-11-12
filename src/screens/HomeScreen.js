import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/HomeScreen';
import { getData } from '../utils/storage';
import Header from './Header/Header';
import Starting from './Starting/Starting';
import Home from './Home/Home';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
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
      } else {
        setShowHome(false);
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
      setShowHome(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View>
        {showHome ? (
          <Home onRefresh={checkGuideStatus} />
        ) : (
          <Starting onComplete={checkGuideStatus} />
        )}
      </View>
    </SafeAreaView>
  );
}
