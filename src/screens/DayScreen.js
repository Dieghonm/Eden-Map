// src/screens/DayScreen.js - VERSÃO ATUALIZADA
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
  
  // ✅ Usando campos separados
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

  // Sincroniza ao entrar na tela
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
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.button} />
        <Text style={{ color: theme.fontColor, marginTop: 10 }}>
          {sincronizando ? 'Sincronizando progresso...' : 'Carregando...'}
        </Text>
      </SafeAreaView>
    );
  }

  // Calcula progresso
  const totalDias = 84; // 12 semanas * 7 dias
  const diasCompletos = (semanaAtual - 1) * 7 + diaAtual;
  const progressoPercentual = Math.round((diasCompletos / totalDias) * 100);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <GlassBox style={{ padding: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.fontColor, textAlign: 'center' }}>
          Dia <Text style={{ color: theme.alert }}>{diaAtual}</Text>
        </Text>

        <Text style={{ fontSize: 18, color: theme.fontColor, marginTop: 10, textAlign: 'center' }}>
          Semana <Text style={{ color: theme.success }}>{semanaAtual}</Text> de 12
        </Text>

        {progressoAtualizadoEm && (
          <Text style={{ fontSize: 12, color: theme.fontColor, marginTop: 15, textAlign: 'center' }}>
            Atualizado em: {new Date(progressoAtualizadoEm).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        )}

        {/* Barra de Progresso */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: theme.fontColor, marginBottom: 5 }}>Progresso Geral</Text>
          <View style={{ 
            width: '100%', 
            height: 10, 
            backgroundColor: theme.terciario, 
            borderRadius: 5,
            overflow: 'hidden'
          }}>
            <View style={{ 
              width: `${progressoPercentual}%`, 
              height: '100%', 
              backgroundColor: theme.success 
            }} />
          </View>
          <Text style={{ color: theme.alert, marginTop: 5 }}>
            {progressoPercentual}% completo ({diasCompletos}/{totalDias} dias)
          </Text>
        </View>

        {avancando ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={{ color: theme.fontColor, marginTop: 10 }}>Avançando...</Text>
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
