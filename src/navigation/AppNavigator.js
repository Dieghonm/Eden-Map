import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { api, tokenHelpers } from '../services/api';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, setUser } = useContext(AppContext);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Escuta mudanças no usuário do contexto
  useEffect(() => {
    if (user && user.login) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsAuthenticated(false);
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Verificando autenticação...');
      
      // Verifica se existe token armazenado
      const token = await tokenHelpers.get();
      
      if (!token) {
        console.log('❌ Nenhum token encontrado');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      console.log('✅ Token encontrado, validando...');
      
      // Valida o token com o backend
      const userData = await api.me();
      
      console.log('✅ Token válido, usuário autenticado:', userData);
      
      // Atualiza o contexto do usuário
      setUser({
        login: userData.login,
        email: userData.email,
        tag: userData.tag,
        plan: userData.plan,
      });
      
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('❌ Erro na validação do token:', error);
      
      // Se o token for inválido ou expirado, remove
      if (error.status === 401 || error.status === 403) {
        console.log('🗑️ Token inválido, removendo...');
        await tokenHelpers.remove();
        setUser(null);
      }
      
      setIsAuthenticated(false);
      
    } finally {
      setIsLoading(false);
    }
  };

  // Tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}>
        <ActivityIndicator size="large" color={theme.button} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}