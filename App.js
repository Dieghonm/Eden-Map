import React from 'react';
import { View, ImageBackground, StyleSheet, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/context/AppProvider';
import JourneyProvider from './src/context/JourneyProvider';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';
import { createStyles } from './src/styles/App';
import { useOutfitFonts } from './src/theme/texts';
import * as NavigationBar from 'expo-navigation-bar';

function AppContent() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const fontsLoaded = useOutfitFonts();

  React.useEffect(() => {
    // Apenas esconder a navigation bar (sem setBehaviorAsync)
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  if (!fontsLoaded) return null;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  };

  return (
    <ImageBackground
      source={require('./assets/Fundo.png')}
      style={styles.container}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>

        <RNStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <JourneyProvider>
            <AppContent />
          </JourneyProvider>
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
