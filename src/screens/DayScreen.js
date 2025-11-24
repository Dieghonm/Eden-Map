// src/screens/DayScreen.js - VERSÃO CAMPOS SEPARADOS

import React, { useContext, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { AppContext } from '../context/AppProvider';
import { createStyles } from '../styles/DayScreen';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecundary from '../components/ButtonSecundary';
import GlassBox from '../components/GlassBox';

export default function DayScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // ✨ Pega progresso do contexto (campos separados)
  const { 
    semanaAtual,
    diaAtual,
    progressoAtualizadoEm,
    avancarDia,
    sincronizarProgressoComBackend,
    isLoading 
  } = useContext(AppContext);

  const [sincronizando, setSincronizando] = React.useState(false);
  const [avancando, setAvancando] = React.useState(false);

  // ✨ Sincroniza com backend ao entrar na tela
  useEffect(() => {
    sincronizarProgresso();
  }, []);

  const sincronizarProgresso = async () => {
    setSincronizando(true);
    try {
      await sincronizarProgressoComBackend();
      console.log('✅ Progresso sincronizado');
    } catch (error) {
      console.log('⚠️ Erro ao sincronizar:', error);
    } finally {
      setSincronizando(false);
    }
  };

  const handleAvancarDia = async () => {
    Alert.alert(
      'Avançar para o próximo dia?',
      'Você deseja concluir este dia e avançar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setAvancando(true);
            try {
              const resultado = await avancarDia();
              
              if (resultado.sucesso) {
                Alert.alert('Sucesso!', resultado.message);
              } else {
                Alert.alert('Parabéns!', resultado.message);
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível avançar o dia.');
            } finally {
              setAvancando(false);
            }
          }
        }
      ]
    );
  };

  if (isLoading || sincronizando) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.button} />
        <Text style={styles.loadingText}>
          {sincronizando ? 'Sincronizando progresso...' : 'Carregando...'}
        </Text>
      </SafeAreaView>
    );
  }

  // Calcula progresso percentual
  const totalDias = 84; // 12 semanas * 7 dias
  const diasCompletos = (semanaAtual - 1) * 7 + diaAtual;
  const progressoPercentual = Math.round((diasCompletos / totalDias) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <GlassBox style={styles.card}>
        <Text style={styles.title}>
          Dia <Text style={styles.highlight}>{diaAtual}</Text>
        </Text>

        <Text style={styles.info}>
          Semana <Text style={styles.success}>{semanaAtual}</Text> de 12
        </Text>

        {progressoAtualizadoEm && (
          <Text style={styles.dateText}>
            Última atualização: {new Date(progressoAtualizadoEm).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        )}

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progresso Geral</Text>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${progressoPercentual}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {progressoPercentual}% completo ({diasCompletos}/{totalDias} dias)
          </Text>
        </View>

        {avancando ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Avançando...</Text>
          </View>
        ) : (
          <ButtonPrimary
            title="Concluir e Avançar"
            onPress={handleAvancarDia}
            width={220}
          />
        )}
      </GlassBox>

      <ButtonSecundary
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
