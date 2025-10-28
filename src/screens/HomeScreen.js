import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/HomeScreen';
import Header from './Header/Header';

export default function HomeScreen() {
  const { user } = useContext(AppContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header />
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.welcomeText}>
            Olá, <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>!
            {'\n\n'}
            Seu aplicativo está funcionando perfeitamente com o sistema de temas.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
