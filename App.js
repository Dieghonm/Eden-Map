import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/context/AppProvider';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import { createStyles } from './src/styles/App';

function AppContent() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ImageBackground
      source={require('./assets/Fundo.png')}
      style={styles.container}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


