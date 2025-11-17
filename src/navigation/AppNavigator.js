import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { api, tokenHelpers } from '../services/api';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import Header from '../screens/Header/Header';


import VideosScreen from '../screens/Explorer/VideosScreen';
import MissoesScreen from '../screens/Explorer/MissoesScreen';
import MeditacoesScreen from '../screens/Explorer/MeditacoesScreen';
import ReflexoesScreen from '../screens/Explorer/ReflexoesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, setUser } = useContext(AppContext);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user && user.login) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const token = await tokenHelpers.get();
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      const userData = await api.me();
      setUser({
        login: userData.login,
        email: userData.email,
        tag: userData.tag,
        plan: userData.plan,
      });
      
      setIsAuthenticated(true);
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        await tokenHelpers.remove();
        setUser(null);
      }
      
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

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
        <>
          <Stack.Screen name="Home">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    // Força o HomeScreen a resetar
                    props.navigation.setParams({ triggerReset: Date.now() });
                  }}
                />
                <HomeScreen {...props} />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Explorer">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    props.navigation.navigate('Home', { triggerReset: Date.now() });
                  }}
                />
                <ExplorerScreen {...props} />
              </View>
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Videos">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    props.navigation.navigate('Home', { triggerReset: Date.now() });
                  }}
                />
                <VideosScreen {...props} />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Missoes">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    props.navigation.navigate('Home', { triggerReset: Date.now() });
                  }}
                />
                <MissoesScreen {...props} />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Meditacoes">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    props.navigation.navigate('Home', { triggerReset: Date.now() });
                  }}
                />
                <MeditacoesScreen {...props} />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Reflexoes">
            {(props) => (
              <View style={{ flex: 1 }}>
                <Header 
                  onHomePress={() => props.navigation.navigate('Home')}
                  onResetStarting={() => {
                    props.navigation.navigate('Home', { triggerReset: Date.now() });
                  }}
                />
                <ReflexoesScreen {...props} />
              </View>
            )}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}