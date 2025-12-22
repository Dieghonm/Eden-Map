import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { api, testConnection, tokenHelpers } from '../services/api';

import Header from '../screens/Header/Header';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import DayScreen from '../screens/DayScreen';
import VideosScreen from '../screens/Explorer/VideosScreen';
import MissoesScreen from '../screens/Explorer/MissoesScreen';
import MeditacoesScreen from '../screens/Explorer/MeditacoesScreen';
import ReflexoesScreen from '../screens/Explorer/ReflexoesScreen';
import CompletionScreen from '../screens/Login/CompletionScreen';

import ServerLoadingScreen from '../components/ServerLoadingScreen';

const Stack = createNativeStackNavigator();

const DEV_CONFIG = {
  BYPASS_STARTING: false,
  SHOW_DEV_BUTTON: false,
  MOCK_STARTING_DATA: {
    desireName: 'Teste Dev',
    desireDescription: 'Descrição de teste',
    selectedFeelings: [1, 2, 3],
    selectedPath: 'Ansiedade'
  }
};

function DevControls({ onBypassToggle, isBypassed }) {
  const { theme } = useTheme();

  if (!__DEV__ || !DEV_CONFIG.SHOW_DEV_BUTTON) return null;

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: isBypassed ? theme.success : theme.warning,
        padding: 15,
        borderRadius: 30,
      }}
      onPress={onBypassToggle}
      activeOpacity={0.8}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
        {isBypassed ? '🚀 DEV' : '🛠️ DEV'}
      </Text>
    </TouchableOpacity>
  );
}

export default function AppNavigator() {
  const {
    user,
    setUser,
    setDesireName,
    setDesireDescription,
    setSelectedFeelings,
    setSelectedPath
  } = useContext(AppContext);

  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [isServerReady, setIsServerReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [devBypassEnabled, setDevBypassEnabled] = useState(__DEV__ && DEV_CONFIG.BYPASS_STARTING);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!(user && user.login));
  }, [user]);

  useEffect(() => {
    if (devBypassEnabled && isAuthenticated) applyMockStartingData();
  }, [devBypassEnabled, isAuthenticated]);

  const checkAuthStatus = async () => {
    const MAX_TIME = 120000;
    const INTERVAL = 10000;
    const startTime = Date.now();
    let serverOnline = false;

    try {
      while (!serverOnline && Date.now() - startTime < MAX_TIME) {
        try {
          const response = await testConnection();
          console.log('🔎 Retorno testConnection:', response);

          if (response) {
            serverOnline = true;
            break;
          }

          await new Promise(resolve => setTimeout(resolve, INTERVAL));
        } catch (error) {
          await new Promise(resolve => setTimeout(resolve, INTERVAL));
        }
      }

      setIsServerReady(true);

      if (!serverOnline) {
        setIsAuthenticated(false);
        return;
      }

      const accessToken = await tokenHelpers.get();

      if (accessToken) {
        if (!user || !user.login) {
          const userData = await api.me();
          await setUser({
            login: userData.login,
            email: userData.email,
            tag: userData.tag,
            plan: userData.plan,
          });
        }
        setIsAuthenticated(true);
      } else {
        await attemptTokenRefresh();
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const attemptTokenRefresh = async () => {
    try {
      const refreshToken = await tokenHelpers.getRefresh();
      if (!refreshToken) return;

      const response = await api.refresh(refreshToken);

      if (response.user) {
        await setUser({
          login: response.user.login,
          email: response.user.email,
          tag: response.user.tag,
          plan: response.user.plan,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      await tokenHelpers.remove();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const applyMockStartingData = async () => {
    await setDesireName(DEV_CONFIG.MOCK_STARTING_DATA.desireName);
    await setDesireDescription(DEV_CONFIG.MOCK_STARTING_DATA.desireDescription);
    await setSelectedFeelings(DEV_CONFIG.MOCK_STARTING_DATA.selectedFeelings);
    await setSelectedPath(DEV_CONFIG.MOCK_STARTING_DATA.selectedPath);
  };

  const toggleDevBypass = () => {
    setDevBypassEnabled(prev => !prev);
  };

  if (!isServerReady) {
    return <ServerLoadingScreen texto={isServerReady}/>;
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.button} />
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <View style={{ flex: 1 }}>
                  <Header onHomePress={() => props.navigation.navigate('Home')} />
                  <HomeScreen {...props} />
                </View>
              )}
            </Stack.Screen>

            <Stack.Screen name="Day">
              {(props) => (
                <View style={{ flex: 1 }}>
                  <Header onHomePress={() => props.navigation.navigate('Home')} />
                  <DayScreen {...props} />
                </View>
              )}
            </Stack.Screen>

            <Stack.Screen name="Explorer" component={ExplorerScreen} />
            <Stack.Screen name="Videos" component={VideosScreen} />
            <Stack.Screen name="Missoes" component={MissoesScreen} />
            <Stack.Screen name="Meditacoes" component={MeditacoesScreen} />
            <Stack.Screen name="Reflexoes" component={ReflexoesScreen} />
            <Stack.Screen name="Completion" component={CompletionScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>

      {isAuthenticated && (
        <DevControls
          onBypassToggle={toggleDevBypass}
          isBypassed={devBypassEnabled}
        />
      )}
    </>
  );
}
