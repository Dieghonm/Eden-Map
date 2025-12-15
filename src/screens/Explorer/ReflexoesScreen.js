// src/screens/Explorer/ReflexoesScreen.js
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // ============================================================================
  // 📊 CAPTURA TODOS OS DADOS DOS PROVIDERS
  // ============================================================================
  
  // AppProvider
  const appData = useApp();
  const {
    user,
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    semanaAtual,
    diaAtual,
    progressoAtualizadoEm,
    isStartingComplete,
    statusDias,
    resetKey
  } = appData;

  // JourneyProvider
  const journeyData = useJourney();
  const {
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    meditacaoRespostas,
    tempoRespiracao,
    missoesConcluidas,
    configRespiracao,
    obterProgressoGeral
  } = journeyData;

  // Progresso geral
  const progressoGeral = obterProgressoGeral();

  // ============================================================================
  // 🔍 EFFECT PARA FAZER LOG DE TUDO
  // ============================================================================
  useEffect(() => {
    console.log('\n🎯 ============================================');
    console.log('📱 REFLEXÕES SCREEN - LOG COMPLETO DOS DADOS');
    console.log('🎯 ============================================\n');

    // --- APP PROVIDER ---
    console.log('📦 APP PROVIDER:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Status Dias:', JSON.stringify(statusDias, null, 2));
    console.log('🔄 Reset Key:', resetKey);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // --- JOURNEY PROVIDER ---
    console.log('🎒 JOURNEY PROVIDER:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Tracking Respostas:', JSON.stringify(trackingRespostas, null, 2));
    console.log('❓ Perguntas Respostas:', JSON.stringify(perguntasRespostas, null, 2));
    console.log('⚙️ Config Respiração:', JSON.stringify(configRespiracao, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // --- PROGRESSO GERAL ---
    console.log('📈 PROGRESSO GERAL:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎬 Cenas:', progressoGeral.cenas);
    console.log('📹 Vídeos:', progressoGeral.videos);
    console.log('📊 Tracking:', progressoGeral.tracking);
    console.log('❓ Perguntas:', progressoGeral.perguntas);
    console.log('🧘 Meditações:', progressoGeral.meditacoes);
    console.log('🎯 Missões:', progressoGeral.missoes);
    console.log('✨ TOTAL:', progressoGeral.total);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // --- ANÁLISE DETALHADA ---
    console.log('🔬 ANÁLISE DETALHADA:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    

    // Tracking por semana
    console.log('\n📊 Tracking por Semana:');
    trackingRespostas.forEach((track, index) => {
      if (track) {
        console.log(`  Semana ${index + 1}:`, {
          path: track.path,
          resposta: track.resposta,
          timestamp: track.timestamp
        });
      }
    });

    // Perguntas por semana
    console.log('\n📊 Perguntas por Semana:');
    perguntasRespostas.forEach((pergunta, index) => {
      if (pergunta) {
        console.log(`  Semana ${index + 1}:`, {
          path: pergunta.path,
          respostaLength: pergunta.resposta?.length || 0,
          timestamp: pergunta.timestamp
        });
      }
    });

    // Meditações por semana
    console.log('\n📊 Meditações por Semana:');
    meditacaoRespostas.forEach((meditacao, index) => {
      if (meditacao) {
        console.log(`  Semana ${index + 1}:`, {
          path: meditacao.path,
          totalCenas: meditacao.cenas?.length || 0,
          timestamp: meditacao.timestamp
        });
      }
    });

    // Missões por semana
    console.log('\n📊 Missões por Semana:');
    missoesConcluidas.forEach((missao, index) => {
      if (missao) {
        console.log(`  Semana ${index + 1}:`, {
          path: missao.path,
          titulo: missao.titulo,
          concluida: missao.concluida,
          estrelas: missao.estrelas,
          timestamp: missao.timestamp
        });
      }
    });


    console.log('🎯 ============================================');
    console.log('✅ FIM DO LOG COMPLETO');
    console.log('🎯 ============================================\n');

  }, [
    // Dependencies para reagir a mudanças
    user,
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    semanaAtual,
    diaAtual,
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    meditacaoRespostas,
    missoesConcluidas,
    resetKey
  ]);

  // ============================================================================
  // 🎨 RENDER
  // ============================================================================
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Reflexões - Debug Screen</Text>
        <Text style={styles.subtitle}>
          Esta tela está fazendo log de todos os dados dos providers.
          Abra o console do seu navegador ou terminal para ver os dados.
        </Text>

        <ButtonPrimary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}