import { tokenHelpers } from '../services/api';
import { removeData } from '../utils/storage';

/**
 * Realiza logout completo do usuário
 * Remove token e dados do usuário
 */
export const logout = async (setUser, navigation) => {
  try {
    console.log('🚪 Realizando logout...');
    
    // Remove token
    await tokenHelpers.remove();
    
    // Remove dados do usuário do storage
    await removeData('user');
    
    // Limpa contexto
    setUser(null);
    
    // Navega para login
    if (navigation) {
      navigation.replace('Login');
    }
    
    console.log('✅ Logout realizado com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao realizar logout:', error);
  }
};

/**
 * Verifica se o token ainda é válido
 * Retorna true se válido, false caso contrário
 */
export const isTokenValid = async (api) => {
  try {
    const token = await tokenHelpers.get();
    
    if (!token) {
      return false;
    }
    
    // Tenta buscar dados do usuário
    await api.me();
    return true;
    
  } catch (error) {
    // Token inválido ou expirado
    if (error.status === 401 || error.status === 403) {
      await tokenHelpers.remove();
    }
    return false;
  }
};