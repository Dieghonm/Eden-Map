import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/HomeScreen';
import { logout } from '../utils/authHelper';
import Header from './Header/Header';
import ButtonSecundary from '../components/ButtonSecundary';

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AppContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleLogout = async () => {
    await logout(setUser, navigation);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header />
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.welcomeText}>
            Olá, <Text style={styles.userName}>{user?.login || 'Usuário'}</Text>!
            {'\n\n'}
            Seu aplicativo está funcionando perfeitamente com o sistema de temas.
            {'\n\n'}
            Email: {user?.email || 'Não informado'}
            {'\n'}
            Plano: {user?.plan || 'trial'}
            {'\n'}
            Tag: {user?.tag || 'cliente'}
          </Text>
        </View>

        <View style={styles.logoutContainer}>
          <ButtonSecundary
            title="Sair"
            onPress={handleLogout}
            width={220}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
