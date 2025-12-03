// src/services/api.js - VERSÃO COMPLETA COM LOCAL + RENDER
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ============================================================================
// 🔧 CONFIGURAÇÃO DE AMBIENTES
// ============================================================================

const API_CONFIG = {
  // ✅ DESENVOLVIMENTO (Local)
  development: {
    web: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    ios: 'http://localhost:8000',
    physical: 'http://192.168.1.101:8000', // ← Altere para o IP da sua máquina
  },
  
  // ✅ PRODUÇÃO (Render)
  production: {
    url: 'https://back-eden-map.onrender.com'
  }
};

// ============================================================================
// 🎯 DETECÇÃO INTELIGENTE DE AMBIENTE
// ============================================================================

/**
 * Retorna a URL base da API baseado no ambiente
 * 
 * Prioridade:
 * 1. Variável de ambiente (se existir)
 * 2. __DEV__ (desenvolvimento vs produção)
 * 3. Platform.OS (web, android, ios, etc)
 */
const getBaseURL = () => {
  // 🔍 1. Tenta ler de variável de ambiente (se você configurar)
  // const envUrl = process.env.REACT_APP_API_URL || process.env.API_URL;
  // if (envUrl) {
  //   console.log('🌐 API URL (de .env):', envUrl);
  //   return envUrl;
  // }

  // 🔍 2. Detecta ambiente (dev vs prod)
  const environment = __DEV__ ? 'development' : 'production';
  
  // 🔍 3. Produção: sempre usa Render
  if (environment === 'production') {
    const url = API_CONFIG.production.url;

    return url;
  }
  
  // 🔍 4. Desenvolvimento: usa servidor local baseado na plataforma
  const platform = Platform.OS;
  let url;
  
  switch (platform) {
    case 'web':
      url = API_CONFIG.development.web;
      break;
    case 'android':
      url = API_CONFIG.production.url;
      break;
    case 'ios':
      url = API_CONFIG.production.url;
      break;
    default:
      url = API_CONFIG.development.physical;

  }
  
  return url;
};

const BASE_URL = getBaseURL();

// ============================================================================
// 🔄 SISTEMA DE FALLBACK (tenta local, depois Render)
// ============================================================================

let usingFallback = false;

/**
 * Tenta usar Render como fallback se local falhar
 */
const getFallbackURL = () => {
  if (!__DEV__ || usingFallback) {
    return BASE_URL; // Já está usando fallback ou está em produção
  }
  
  usingFallback = true;
  return API_CONFIG.production.url;
};

// ============================================================================
// 🔑 GERENCIAMENTO DE TOKENS
// ============================================================================

export const tokenHelpers = {
  save: async (accessToken, refreshToken = null) => {
    try {
      await AsyncStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }
    } catch (error) {
      console.error('❌ Erro ao salvar tokens:', error);
    }
  },

  get: async () => {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);
      return null;
    }
  },

  getRefresh: async () => {
    try {
      return await AsyncStorage.getItem('refresh_token');
    } catch (error) {
      console.error('❌ Erro ao obter refresh token:', error);
      return null;
    }
  },

  remove: async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
    } catch (error) {
      console.error('❌ Erro ao remover tokens:', error);
    }
  }
};

// ============================================================================
// 🌐 REQUISIÇÕES HTTP COM FALLBACK
// ============================================================================

const apiRequest = async (endpoint, options = {}, retryWithFallback = true) => {
  const currentUrl = usingFallback ? getFallbackURL() : BASE_URL;
  
  try {
    const url = `${currentUrl}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };
    
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`, data);
      throw {
        status: response.status,
        message: data.detail || data.message || 'Erro na requisição',
        data
      };
    }
    return data;

  } catch (error) {
    console.error('❌ Network Error:', error);
    if (error.status) {
      throw error;
    }
    
    if (__DEV__ && !usingFallback && retryWithFallback) {
      const fallbackUrl = getFallbackURL();
      return apiRequest(endpoint, options, false); 
    }
    
    let helpMessage = 'Erro de conexão. ';
    
    if (__DEV__) {
      if (Platform.OS === 'web') {
        helpMessage += 'Certifique-se de que o backend está rodando em http://localhost:8000';
      } else if (Platform.OS === 'android') {
        helpMessage += 'No emulador Android, use http://10.0.2.2:8000. ';
        helpMessage += 'Em dispositivo físico, use o IP da sua máquina na mesma rede WiFi.';
      } else {
        helpMessage += 'Verifique se está na mesma rede WiFi e se o IP está correto.';
      }
    } else {
      helpMessage += 'Verifique sua conexão com a internet.';
    }
    
    throw {
      status: 0,
      message: helpMessage,
      data: null
    };
  }
};

const authenticatedRequest = async (endpoint, options = {}) => {
  const token = await tokenHelpers.get();
  
  if (!token) {
    throw {
      status: 401,
      message: 'Token não encontrado. Faça login novamente.',
      data: null
    };
  }

  return apiRequest(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
};

// ============================================================================
// 📡 EXPORTAÇÃO PRINCIPAL - API UNIFICADA
// ============================================================================

export const api = {
  // ===========================
  // AUTENTICAÇÃO
  // ===========================
  
  cadastro: async (userData) => {
    return apiRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  refresh: async (refreshToken) => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  // ===========================
  // RECUPERAÇÃO DE SENHA
  // ===========================
  
  solicitarTempKey: async (email) => {
    return apiRequest('/auth/password-recovery/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  validarTempKey: async (email, code) => {
    return apiRequest('/auth/password-recovery/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  redefinirSenha: async (email, code, newPassword) => {
    return apiRequest('/auth/password-recovery/reset', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        code, 
        new_password: newPassword 
      }),
    });
  },

  // ===========================
  // USUÁRIO - DADOS COMPLETOS
  // ===========================
  
  buscarDadosUsuario: async (email) => {
    return apiRequest('/users/data', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // ===========================
  // STARTING (ONBOARDING)
  // ===========================
  
  atualizarCaminho: async (email, selectedPath) => {
    return apiRequest('/users/selected-path', {
      method: 'PUT',
      body: JSON.stringify({ 
        email, 
        selected_path: selectedPath 
      }),
    });
  },

  atualizarTestResults: async (email, testResults) => {
    return apiRequest('/users/test-results', {
      method: 'PUT',
      body: JSON.stringify({ 
        email: email,
        test_results: testResults
      }),
    });
  },

  resetarTestResults: async (email) => {
    return apiRequest('/users/test-results/reset', {
      method: 'DELETE',
      body: JSON.stringify({ email }),
    });
  },

  atualizarProgresso: async (email, semana, dia) => {
    return apiRequest('/users/progress', {
      method: 'PUT',
      body: JSON.stringify({ 
        email,
        progress: {
          semana,
          dia
        }
      }),
    });
  },

  // ===========================
  // HEALTH CHECK
  // ===========================
  
  health: async () => {
    return apiRequest('/health', {
      method: 'GET',
    });
  },
};

// ============================================================================
// 🛠️ UTILITÁRIOS DE DEBUG
// ============================================================================

/**
 * Testa a conexão com a API
 */
export const testConnection = async () => {
  console.log('\n🧪 TESTANDO CONEXÃO COM A API...\n');
  
  try {
    const response = await api.health();
    console.log('✅ CONEXÃO OK!');
    console.log('📊 Resposta:', response);
    return true;
  } catch (error) {
    console.error('❌ CONEXÃO FALHOU!');
    console.error('📊 Erro:', error.message);
    return false;
  }
};

/**
 * Força uso do Render (útil para testes)
 */
export const forceRenderMode = () => {
  usingFallback = true;
  console.log('🔄 FORÇADO: Usando Render em modo DEV');
};

/**
 * Reseta para modo local
 */
export const resetToLocalMode = () => {
  usingFallback = false;
  console.log('🔄 RESET: Voltando para servidor local');
};

/**
 * Retorna configuração atual
 */
export const getCurrentConfig = () => {
  return {
    baseUrl: usingFallback ? API_CONFIG.production.url : BASE_URL,
    environment: __DEV__ ? 'development' : 'production',
    platform: Platform.OS,
    usingFallback
  };
};

export { BASE_URL };
export default api;