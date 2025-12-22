// src/screens/CompletionScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import ConfettiCannon from 'react-native-confetti-cannon';

import { useTheme } from '@react-navigation/native';
import { createStyles } from '../../styles/CompletionScreen';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import { CAMINHOS } from '../../../assets/json/Sentimentos';

export default function CompletionScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const {
    user,
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    semanaAtual,
    diaAtual,
  } = useApp();

  const {
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    missoesConcluidas,
    obterProgressoGeral,
  } = useJourney();

  const [showConfetti, setShowConfetti] = useState(true);
  const [progresso, setProgresso] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const prog = obterProgressoGeral();
    setProgresso(prog);

    // Para o confetti após 3 segundos
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pathData = CAMINHOS.find(c => c.nome === selectedPath);

  const calcularTotalDias = () => {
    return (semanaAtual - 1) * 7 + diaAtual;
  };

  const calcularPercentualTracking = () => {
    const total = Object.values(trackingRespostas).reduce((a, b) => a + b, 0);
    if (total === 0) return { feliz: 33, neutro: 33, triste: 33 };
    
    return {
      feliz: Math.round((trackingRespostas.feliz / total) * 100),
      neutro: Math.round((trackingRespostas.neutro / total) * 100),
      triste: Math.round((trackingRespostas.triste / total) * 100),
    };
  };

  const trackingPercent = calcularPercentualTracking();

  return (
    <View style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CONFETTI */}
        {showConfetti && (
          <ConfettiCannon
            count={50}
            origin={{ x: -10, y: 0 }}
            fadeOut
            explosionSpeed={350}
            fallSpeed={2000}
            autoStart
          />
        )}

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.congratsTitle}>🎉 Parabéns!</Text>
          <Text style={styles.congratsSubtitle}>
            Você completou sua jornada no Eden Map!
          </Text>
        </View>

        {/* IMAGEM DO CAMINHO */}
        {pathData?.img && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pathData.img }}
              style={styles.pathImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* RESUMO DO USUÁRIO */}
        <GlassBox>
          <Text style={styles.sectionTitle}>Sua Jornada</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Usuário:</Text>
            <Text style={styles.value}>{user?.login || 'Anônimo'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Caminho:</Text>
            <Text style={[styles.value, { color: pathData?.color || theme.alert }]}>
              {selectedPath}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Desejo:</Text>
            <Text style={styles.value}>{desireName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Total de Dias:</Text>
            <Text style={styles.value}>{calcularTotalDias()} dias</Text>
          </View>
        </GlassBox>

        {/* ESTATÍSTICAS */}
        <GlassBox>
          <Text style={styles.sectionTitle}>Estatísticas da Jornada</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.cenas || 0}</Text>
              <Text style={styles.statLabel}>Cenas Descritas</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.videos || 0}</Text>
              <Text style={styles.statLabel}>Vídeos Assistidos</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.perguntas || 0}</Text>
              <Text style={styles.statLabel}>Reflexões</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.meditacoes || 0}</Text>
              <Text style={styles.statLabel}>Meditações</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.missoes || 0}</Text>
              <Text style={styles.statLabel}>Missões</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{progresso?.tracking || 0}</Text>
              <Text style={styles.statLabel}>Trackings</Text>
            </View>
          </View>
        </GlassBox>

        {/* BALANÇO EMOCIONAL */}
        <GlassBox>
          <Text style={styles.sectionTitle}>Balanço Emocional</Text>
          
          <View style={styles.emotionBar}>
            <View style={[styles.emotionSegment, { 
              width: `${trackingPercent.triste}%`,
              backgroundColor: theme.warning 
            }]} />
            <View style={[styles.emotionSegment, { 
              width: `${trackingPercent.neutro}%`,
              backgroundColor: theme.alert 
            }]} />
            <View style={[styles.emotionSegment, { 
              width: `${trackingPercent.feliz}%`,
              backgroundColor: theme.success 
            }]} />
          </View>

          <View style={styles.emotionLabels}>
            <Text style={styles.emotionLabel}>
              😢 {trackingPercent.triste}%
            </Text>
            <Text style={styles.emotionLabel}>
              😐 {trackingPercent.neutro}%
            </Text>
            <Text style={styles.emotionLabel}>
              😊 {trackingPercent.feliz}%
            </Text>
          </View>
        </GlassBox>

        {/* MENSAGEM FINAL */}
        <GlassBox>
          <Text style={styles.finalMessage}>
            Você completou <Text style={styles.highlight}>84 dias</Text> de transformação.{'\n\n'}
            Continue praticando os ensinamentos e{' '}
            <Text style={styles.highlight}>manifeste seu desejo</Text>.{'\n\n'}
            O paraíso está dentro de você! 🌟
          </Text>
        </GlassBox>

        {/* BOTÃO DE AÇÃO */}
        <ButtonPrimary
          title="Voltar para Home"
          onPress={() => navigation.navigate('Home')}
        />

        {/* BOTÃO DE DEBUG (só aparece em DEV) */}
        {__DEV__ && (
          <ButtonSecundary
            title="🔍 Ver Todos os Dados (Debug)"
            onPress={() => setShowDebug(true)}
          />
        )}

        <Text style={styles.footer}>
          Obrigado por fazer parte do Eden Map ❤️
        </Text>
      </ScrollView>

    </View>
  );
}