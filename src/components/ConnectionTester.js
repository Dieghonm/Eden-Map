// src/components/ConnectionTester.js
// ⚠️ COMPONENTE APENAS PARA DESENVOLVIMENTO - REMOVA EM PRODUÇÃO
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { 
  testConnection, 
  getCurrentConfig, 
  forceRenderMode, 
  resetToLocalMode 
} from '../services/api';

export default function ConnectionTester() {
  const [config, setConfig] = useState(null);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    updateConfig();
  }, []);

  const updateConfig = () => {
    const currentConfig = getCurrentConfig();
    setConfig(currentConfig);
  };

  const handleTest = async () => {
    setTesting(true);
    setResult(null);
    
    const success = await testConnection();
    
    setResult(success ? 'success' : 'error');
    setTesting(false);
    updateConfig();
  };

  const handleForceRender = () => {
    forceRenderMode();
    updateConfig();
    setResult(null);
  };

  const handleResetLocal = () => {
    resetToLocalMode();
    updateConfig();
    setResult(null);
  };

  // Só mostra em desenvolvimento
  if (!__DEV__) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Connection Tester</Text>
      
      {config && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>URL Atual:</Text>
          <Text style={styles.infoValue}>{config.baseUrl}</Text>
          
          <Text style={styles.infoLabel}>Plataforma:</Text>
          <Text style={styles.infoValue}>{config.platform}</Text>
          
          <Text style={styles.infoLabel}>Ambiente:</Text>
          <Text style={styles.infoValue}>{config.environment}</Text>
          
          {config.usingFallback && (
            <Text style={styles.fallbackBadge}>🔄 Usando Fallback (Render)</Text>
          )}
        </View>
      )}

      {result && (
        <View style={[
          styles.resultContainer,
          result === 'success' ? styles.resultSuccess : styles.resultError
        ]}>
          <Text style={styles.resultText}>
            {result === 'success' ? '✅ Conexão OK!' : '❌ Conexão Falhou!'}
          </Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, testing && styles.buttonDisabled]}
          onPress={handleTest}
          disabled={testing}
        >
          <Text style={styles.buttonText}>
            {testing ? '⏳ Testando...' : '🧪 Testar Conexão'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleForceRender}
        >
          <Text style={styles.buttonText}>🌐 Forçar Render</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleResetLocal}
        >
          <Text style={styles.buttonText}>💻 Usar Local</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        ⚠️ Este componente só aparece em DEV
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 15,
    borderRadius: 10,
    minWidth: 300,
    maxWidth: 400,
    zIndex: 9999,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#0A84FF',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  fallbackBadge: {
    marginTop: 5,
    color: '#FFAA2E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultSuccess: {
    backgroundColor: 'rgba(56, 193, 151, 0.2)',
    borderWidth: 1,
    borderColor: '#38C197',
  },
  resultError: {
    backgroundColor: 'rgba(234, 89, 89, 0.2)',
    borderWidth: 1,
    borderColor: '#EA5959',
  },
  resultText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    gap: 8,
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#555',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  note: {
    marginTop: 10,
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
});