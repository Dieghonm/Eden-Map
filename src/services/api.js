// src/services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ============================================================================
// CONFIGURAÇÃO DA API
// ============================================================================

const API_CONFIG = {
  development: {
    web: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    ios: 'http://localhost:8000',
    physical: 'http://192.168.1.101:8000',
  },
  production: {
    url: 'https://seu-app.onrender.com'
  }
};

const getBaseURL = () => {
  const environment = __DEV__ ? 'development' : 'production';
  
  if (environment === 'production') {
    return API_CONFIG.production.url;
  }
  
  const platform = Platform.OS;
  
  switch (platform) {
    case 'web':
      return API_CONFIG.development.web;
    case 'android':
      return API_CONFIG.development.android;
    case 'ios':
      return API_CONFIG.development.ios;
    default:
      return API_CONFIG.development.physical;
  }
};

const BASE_URL = getBaseURL();

// ============================================================================
// GERENCIAMENTO DE TOKENS
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
// REQUISIÇÕES HTTP
// ============================================================================

const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    
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
    
    let helpMessage = 'Erro de conexão. ';
    
    if (Platform.OS === 'web') {
      helpMessage += 'Certifique-se de que o backend está rodando em http://localhost:8000';
    } else if (Platform.OS === 'android') {
      helpMessage += 'No emulador Android, use http://10.0.2.2:8000';
    } else {
      helpMessage += 'Verifique se está na mesma rede WiFi e se o IP está correto.';
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
// EXPORTAÇÃO PRINCIPAL - API UNIFICADA
// ============================================================================

export const api = {
  // ===========================
  // AUTENTICAÇÃO
  // ===========================
  
  /**
   * Cadastro de novo usuário
   * @param {Object} userData - { login, password, email, tag?, plan? }
   * @returns {Object} { access_token, refresh_token, user }
   */
  cadastro: async (userData) => {
    return apiRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Login com credenciais
   * @param {Object} credentials - { login, password }
   * @returns {Object} { access_token, refresh_token, user }
   */
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Renovar access token
   * @param {string} refreshToken - Refresh token
   * @returns {Object} { access_token, refresh_token, user }
   */
  refresh: async (refreshToken) => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  // ===========================
  // RECUPERAÇÃO DE SENHA
  // ===========================
  
  /**
   * Etapa 1: Solicitar código de recuperação
   * @param {string} email - Email do usuário
   * @returns {Object} { message, email }
   */
  solicitarTempKey: async (email) => {
    return apiRequest('/auth/password-recovery/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Etapa 2: Verificar código
   * @param {string} email - Email do usuário
   * @param {string} code - Código de 4 dígitos
   * @returns {Object} { message, email }
   */
  validarTempKey: async (email, code) => {
    return apiRequest('/auth/password-recovery/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  /**
   * Etapa 3: Redefinir senha
   * @param {string} email - Email do usuário
   * @param {string} code - Código de 4 dígitos
   * @param {string} newPassword - Nova senha
   * @returns {Object} { message, email }
   */
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
  
  /**
   * ✅ Buscar todos os dados do usuário usando email
   * @param {string} email - Email do usuário
   * @returns {Object} { user_id, login, email, selected_path, test_results, progress }
   */
  buscarDadosUsuario: async (email) => {
    return apiRequest('/users/data', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // ===========================
  // STARTING (ONBOARDING)
  // ===========================
  
  /**
   * ✅ Atualizar selected_path
   * @param {string} email - Email do usuário
   * @param {string} selectedPath - Caminho selecionado (Ansiedade, Atenção Plena, etc)
   * @returns {Object} Confirmação da atualização
   */
  atualizarCaminho: async (email, selectedPath) => {
    return apiRequest('/users/selected-path', {
      method: 'PUT',
      body: JSON.stringify({ 
        email, 
        selected_path: selectedPath 
      }),
    });
  },

  /**
   * ✅ Atualizar test_results
   * @param {string} email - Email do usuário
   * @param {Object} testResults - Resultados do teste { Ansiedade: 20, Atenção_Plena: 20, ... }
   * @returns {Object} Confirmação da atualização
   */
  atualizarTestResults: async (email, testResults) => {
    return apiRequest('/users/test-results', {
      method: 'PUT',
      body: JSON.stringify({ 
        email: email,
        test_results: testResults
      }),
    });
  },

  /**
   * ✅ Resetar test_results para null
   * @param {string} email - Email do usuário
   * @returns {Object} Confirmação da atualização
   */
  resetarTestResults: async (email) => {
    return apiRequest('/users/test-results/reset', {
      method: 'DELETE',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * ✅ Atualizar progresso (semana e dia)
   * @param {string} email - Email do usuário
   * @param {number} semana - Semana atual (1-12)
   * @param {number} dia - Dia atual (1-7)
   * @returns {Object} { message, user_id, email, progress, progress_updated_at }
   */
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

export { BASE_URL };
export default api;