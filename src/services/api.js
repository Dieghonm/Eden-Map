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

  // Aliases antigos (compatibilidade)
  alterarSenhaComTempKey: async (email, code, newPassword) => {
    return api.redefinirSenha(email, code, newPassword);
  },

  // ===========================
  // USUÁRIO
  // ===========================
  
  /**
   * Buscar dados do usuário autenticado
   * ⚠️ FALTA CRIAR NO BACKEND: GET /me
   * @returns {Object} Dados completos do usuário
   */
  me: async () => {
    return authenticatedRequest('/me', {
      method: 'GET',
    });
  },

  /**
   * Atualizar dados do usuário
   * ⚠️ FALTA CRIAR NO BACKEND: PUT /me
   * @param {Object} userData - Dados a serem atualizados
   * @returns {Object} Usuário atualizado
   */
  atualizarPerfil: async (userData) => {
    return authenticatedRequest('/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Deletar conta do usuário
   * ⚠️ FALTA CRIAR NO BACKEND: DELETE /me
   * @returns {Object} Confirmação
   */
  deletarConta: async () => {
    return authenticatedRequest('/me', {
      method: 'DELETE',
    });
  },

  // ===========================
  // STARTING (ONBOARDING)
  // ===========================
  
  /**
   * Buscar dados do Starting
   * ⚠️ FALTA CRIAR NO BACKEND: GET /me/starting
   * @returns {Object} Dados do Starting
   */
  buscarStarting: async () => {
    return authenticatedRequest('/me/starting', {
      method: 'GET',
    });
  },

  /**
   * Atualizar dados do Starting
   * ⚠️ FALTA CRIAR NO BACKEND: PUT /me/starting
   * @param {Object} startingData - Dados do Starting
   * @returns {Object} Starting atualizado
   */
  atualizarStarting: async (startingData) => {
    return authenticatedRequest('/me/starting', {
      method: 'PUT',
      body: JSON.stringify(startingData),
    });
  },

  /**
   * Resetar Starting
   * ⚠️ FALTA CRIAR NO BACKEND: DELETE /me/starting
   * @returns {Object} Confirmação
   */
  resetarStarting: async () => {
    return authenticatedRequest('/me/starting', {
      method: 'DELETE',
    });
  },

  // ===========================
  // PROGRESSO
  // ===========================
  
  /**
   * Buscar progresso do usuário
   * ⚠️ FALTA CRIAR NO BACKEND: GET /me/progress
   * @returns {Object} Dados de progresso
   */
  obterProgresso: async () => {
    return authenticatedRequest('/me/progress', {
      method: 'GET',
    });
  },

  /**
   * Atualizar progresso
   * ⚠️ FALTA CRIAR NO BACKEND: PUT /me/progress
   * @param {Object} progressData - Dados de progresso
   * @returns {Object} Progresso atualizado
   */
  atualizarProgresso: async (progressData) => {
    return authenticatedRequest('/me/progress', {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  },

  /**
   * Avançar dia
   * ⚠️ FALTA CRIAR NO BACKEND: POST /me/progress/advance
   * @returns {Object} Progresso atualizado
   */
  avancarDia: async () => {
    return authenticatedRequest('/me/progress/advance', {
      method: 'POST',
    });
  },

  // ===========================
  // CONTEÚDO
  // ===========================
  
  /**
   * Listar semanas
   * ⚠️ FALTA CRIAR NO BACKEND: GET /content/weeks
   * @returns {Array} Lista de semanas
   */
  listarSemanas: async () => {
    return authenticatedRequest('/content/weeks', {
      method: 'GET',
    });
  },

  /**
   * Listar dias de uma semana
   * ⚠️ FALTA CRIAR NO BACKEND: GET /content/weeks/{week_id}/days
   * @param {number} weekId - ID da semana
   * @returns {Array} Lista de dias
   */
  listarDias: async (weekId) => {
    return authenticatedRequest(`/content/weeks/${weekId}/days`, {
      method: 'GET',
    });
  },

  /**
   * Buscar conteúdo de um dia
   * ⚠️ FALTA CRIAR NO BACKEND: GET /content/days/{day_id}
   * @param {number} dayId - ID do dia
   * @returns {Object} Conteúdo do dia
   */
  buscarDia: async (dayId) => {
    return authenticatedRequest(`/content/days/${dayId}`, {
      method: 'GET',
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