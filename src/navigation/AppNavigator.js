// // src/navigation/AppNavigator.js - VERSÃO CORRIGIDA
// import React, { useEffect, useState, useContext } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AppContext } from '../context/AppProvider';
// import { useTheme } from '../context/ThemeProvider';
// import { api, tokenHelpers } from '../services/api';

// import Header from '../screens/Header/Header';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ExplorerScreen from '../screens/ExplorerScreen';
// import DayScreen from '../screens/DayScreen';
// import VideosScreen from '../screens/Explorer/VideosScreen';
// import MissoesScreen from '../screens/Explorer/MissoesScreen';
// import MeditacoesScreen from '../screens/Explorer/MeditacoesScreen';
// import ReflexoesScreen from '../screens/Explorer/ReflexoesScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const { user, setUser } = useContext(AppContext);
//   const { theme } = useTheme();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   useEffect(() => {
//     const authenticated = !!(user && user.login);
//     setIsAuthenticated(authenticated);
//   }, [user]);

//   const checkAuthStatus = async () => {
//     try {
//       const accessToken = await tokenHelpers.get();
//       if (accessToken) {
//         if (!user || !user.login) {
//           try {
//             const userData = await api.me();
//             await setUser({
//               login: userData.login,
//               email: userData.email,
//               tag: userData.tag,
//               plan: userData.plan,
//             });
//             setIsAuthenticated(true);
//           } catch (error) {
//             console.error('❌ Erro ao buscar dados do usuário:', error);
//             await attemptTokenRefresh();
//           }
//         } else {
//           setIsAuthenticated(true);
//         }
//       } else {
//         console.log('⚠️ Access token não encontrado, tentando renovar...');
//         await attemptTokenRefresh();
//       }
//     } catch (error) {
//       console.error('❌ Erro ao verificar autenticação:', error);
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const attemptTokenRefresh = async () => {
//     try {
//       const refreshToken = await tokenHelpers.getRefresh();
//       if (!refreshToken) {
//         console.log('❌ Nenhum refresh token encontrado');
//         setIsAuthenticated(false);
//         return;
//       }
//       const response = await api.refresh(refreshToken);
//       if (response.user) {
//         await setUser({
//           login: response.user.login,
//           email: response.user.email,
//           tag: response.user.tag,
//           plan: response.user.plan,
//         });
//         setIsAuthenticated(true);
//       } else {
//         const userData = await api.me();
//         await setUser({
//           login: userData.login,
//           email: userData.email,
//           tag: userData.tag,
//           plan: userData.plan,
//         });
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       console.error('❌ Erro ao renovar token:', error);
//       await tokenHelpers.remove();
//       setUser(null);
//       setIsAuthenticated(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: theme.background,
//       }}>
//         <ActivityIndicator size="large" color={theme.button} />
//       </View>
//     );
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={isAuthenticated ? 'Home' : 'Login'}
//       screenOptions={{
//         headerShown: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       }}
//     >
//       {isAuthenticated ? (
//         <>
//           <Stack.Screen name="Home">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.setParams({ triggerReset: Date.now() });
//                   }}
//                 />
//                 <HomeScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>

//           <Stack.Screen name="Day">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <DayScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>

//           <Stack.Screen name="Explorer">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <ExplorerScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>
          
//           <Stack.Screen name="Videos">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <VideosScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>

//           <Stack.Screen name="Missoes">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <MissoesScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>

//           <Stack.Screen name="Meditacoes">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <MeditacoesScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>

//           <Stack.Screen name="Reflexoes">
//             {(props) => (
//               <View style={{ flex: 1 }}>
//                 <Header 
//                   onHomePress={() => props.navigation.navigate('Home')}
//                   onResetStarting={() => {
//                     props.navigation.navigate('Home', { triggerReset: Date.now() });
//                   }}
//                 />
//                 <ReflexoesScreen {...props} />
//               </View>
//             )}
//           </Stack.Screen>
//         </>
//       ) : (
//         <Stack.Screen name="Login" component={LoginScreen} />
//       )}
//     </Stack.Navigator>
//   );
// }

// src/navigation/AppNavigator.js - VERSÃO COM BYPASS DE DEV
import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppProvider';
import { useTheme } from '../context/ThemeProvider';
import { api, tokenHelpers } from '../services/api';

import Header from '../screens/Header/Header';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import DayScreen from '../screens/DayScreen';
import VideosScreen from '../screens/Explorer/VideosScreen';
import MissoesScreen from '../screens/Explorer/MissoesScreen';
import MeditacoesScreen from '../screens/Explorer/MeditacoesScreen';
import ReflexoesScreen from '../screens/Explorer/ReflexoesScreen';

const Stack = createNativeStackNavigator();

// ============================================================================
// 🔧 CONFIGURAÇÃO DE DESENVOLVIMENTO
// ============================================================================

const DEV_CONFIG = {
  // ✅ Ative para pular o Starting automaticamente
  BYPASS_STARTING: false,
  
  // ✅ Se true, mostra botão flutuante para toggle manual
  SHOW_DEV_BUTTON: false,
  
  // ✅ Dados mock para pular o Starting
  MOCK_STARTING_DATA: {
    desireName: 'Teste Dev',
    desireDescription: 'Descrição de teste para desenvolvimento',
    selectedFeelings: [1, 2, 3],
    selectedPath: 'Ansiedade',
    semanaAtual: 1,
    diaAtual: 1
  }
};

// ============================================================================
// 🎛️ COMPONENTE DE CONTROLE DE DEV
// ============================================================================

function DevControls({ onBypassToggle, isBypassed }) {
  const { theme } = useTheme();
  
  // Só mostra em desenvolvimento
  if (!__DEV__ || !DEV_CONFIG.SHOW_DEV_BUTTON) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: isBypassed ? theme.success : theme.warning,
        padding: 15,
        borderRadius: 30,
        zIndex: 9999,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
      onPress={onBypassToggle}
      activeOpacity={0.8}
    >
      <Text style={{ 
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 16
      }}>
        {isBypassed ? '🚀 DEV' : '🛠️ DEV'}
      </Text>
    </TouchableOpacity>
  );
}

// ============================================================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================================================

export default function AppNavigator() {
  const { user, setUser, setDesireName, setDesireDescription, 
          setSelectedFeelings, setSelectedPath } = useContext(AppContext);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [devBypassEnabled, setDevBypassEnabled] = useState(
    __DEV__ && DEV_CONFIG.BYPASS_STARTING
  );

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const authenticated = !!(user && user.login);
    setIsAuthenticated(authenticated);
  }, [user]);

  // ✅ Aplica dados mock quando bypass está ativado
  useEffect(() => {
    if (devBypassEnabled && isAuthenticated) {
      applyMockStartingData();
    }
  }, [devBypassEnabled, isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const accessToken = await tokenHelpers.get();
      if (accessToken) {
        if (!user || !user.login) {
          try {
            const userData = await api.me();
            await setUser({
              login: userData.login,
              email: userData.email,
              tag: userData.tag,
              plan: userData.plan,
            });
            setIsAuthenticated(true);
          } catch (error) {
            console.error('❌ Erro ao buscar dados do usuário:', error);
            await attemptTokenRefresh();
          }
        } else {
          setIsAuthenticated(true);
        }
      } else {
        await attemptTokenRefresh();
      }
    } catch (error) {
      console.error('❌ Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const attemptTokenRefresh = async () => {
    try {
      const refreshToken = await tokenHelpers.getRefresh();
      if (!refreshToken) {
        setIsAuthenticated(false);
        return;
      }
      const response = await api.refresh(refreshToken);
      if (response.user) {
        await setUser({
          login: response.user.login,
          email: response.user.email,
          tag: response.user.tag,
          plan: response.user.plan,
        });
        setIsAuthenticated(true);
      } else {
        const userData = await api.me();
        await setUser({
          login: userData.login,
          email: userData.email,
          tag: userData.tag,
          plan: userData.plan,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('❌ Erro ao renovar token:', error);
      await tokenHelpers.remove();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ============================================================================
  // 🚀 FUNÇÕES DE BYPASS DE DEV
  // ============================================================================

  const applyMockStartingData = async () => {
    console.log('🔧 Aplicando dados mock do Starting...');
    try {
      await setDesireName(DEV_CONFIG.MOCK_STARTING_DATA.desireName);
      await setDesireDescription(DEV_CONFIG.MOCK_STARTING_DATA.desireDescription);
      await setSelectedFeelings(DEV_CONFIG.MOCK_STARTING_DATA.selectedFeelings);
      await setSelectedPath(DEV_CONFIG.MOCK_STARTING_DATA.selectedPath);
    } catch (error) {
      console.error('❌ Erro ao aplicar dados mock:', error);
    }
  };

  const toggleDevBypass = () => {
    const newState = !devBypassEnabled;
    setDevBypassEnabled(newState);
    
    if (newState) {
      console.log('🚀 Bypass do Starting ATIVADO');
      applyMockStartingData();
    } else {
      console.log('🛠️ Bypass do Starting DESATIVADO');
    }
  };

  // ============================================================================
  // 🎨 RENDERIZAÇÃO
  // ============================================================================

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
    <>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
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
                      props.navigation.setParams({ triggerReset: Date.now() });
                    }}
                  />
                  <HomeScreen {...props} />
                </View>
              )}
            </Stack.Screen>

            <Stack.Screen name="Day">
              {(props) => (
                <View style={{ flex: 1 }}>
                  <Header 
                    onHomePress={() => props.navigation.navigate('Home')}
                    onResetStarting={() => {
                      props.navigation.navigate('Home', { triggerReset: Date.now() });
                    }}
                  />
                  <DayScreen {...props} />
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

      {/* 🎛️ Botão flutuante de desenvolvimento (só aparece em DEV) */}
      {isAuthenticated && (
        <DevControls 
          onBypassToggle={toggleDevBypass}
          isBypassed={devBypassEnabled}
        />
      )}
    </>
  );
}