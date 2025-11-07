import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configuração da URL base da API
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

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('access_token', token);
  } catch (error) {
    console.error('❌ Erro ao salvar token:', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (error) {
    console.error('❌ Erro ao obter token:', error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    console.error('❌ Erro ao remover token:', error);
  }
};

export const api = {
  cadastro: async (userData) => {
    return apiRequest('/cadastro', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  me: async () => {
    const token = await getToken();
    if (!token) {
      throw new Error('Token não encontrado');
    }

    return apiRequest('/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  health: async () => {
    return apiRequest('/health', {
      method: 'GET',
    });
  },

  renovarToken: async (token) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  listarUsuarios: async () => {
    const token = await getToken();
    return apiRequest('/usuarios', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ========== RECUPERAÇÃO DE SENHA ==========
  
  // Etapa 1: Solicitar código (envia email)
  solicitarTempKey: async (emailOuLogin) => {
    return apiRequest('/tempkey', {
      method: 'POST',
      body: JSON.stringify({ 
        email_ou_login: emailOuLogin 
      }),
    });
  },

  // Etapa 2: Validar código de 4 dígitos
  validarTempKey: async (emailOuLogin, tempKey) => {
    return apiRequest('/tempkey', {
      method: 'POST',
      body: JSON.stringify({ 
        email_ou_login: emailOuLogin,
        tempKey: tempKey 
      }),
    });
  },

  // Etapa 3: Alterar senha com código validado
  // 🔧 CORREÇÃO: Deve usar /tempkey (não /alterar-senha) e enviar new_password (não nova_senha)
  alterarSenhaComTempKey: async (data) => {
    const { email, tempKey, novaSenha } = data;
    return apiRequest('/tempkey', {
      method: 'POST',
      body: JSON.stringify({
        email_ou_login: email,
        tempKey: tempKey,
        new_password: novaSenha 
      }),
    });
  },
};

export const tokenHelpers = {
  save: saveToken,
  get: getToken,
  remove: removeToken,
};

export { BASE_URL };

export default api;