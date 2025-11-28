// src/screens/Days/Meditacao/PlayerMeditacao.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/PlayerMeditacao';
import ButtonPrimary from '../../../components/ButtonPrimary';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PlayerMeditacao({ selectedPath, semanaAtual, onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { tempoRespiracao } = useJourney();

  const [currentPhase, setCurrentPhase] = useState('respiracao'); // 'respiracao' ou 'meditacao'
  const [isPlaying, setIsPlaying] = useState(false);
  const [allComplete, setAllComplete] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  // URL do áudio
  const audioUrl = "https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3";
  
  const player = useAudioPlayer(audioUrl);

  // Log das informações
  useEffect(() => {
    console.log('=== PLAYER MEDITACAO ===');
    console.log('Caminho selecionado:', selectedPath);
    console.log('Semana atual:', semanaAtual);
    console.log('Tempo de respiração:', tempoRespiracao, 'minutos');
    console.log('========================');
  }, [selectedPath, semanaAtual, tempoRespiracao]);

  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const centerX = radius + strokeWidth / 2;
  const centerY = radius + strokeWidth / 2;

  const duracao = currentPhase === 'respiracao' 
    ? (tempoRespiracao || 5) * 60 
    : 180; // 3 minutos para meditação

  const startAnimation = () => {
    progress.setValue(0);
    
    Animated.timing(progress, {
      toValue: 1,
      duration: duracao * 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        handlePhaseComplete();
      }
    });
  };

  const stopAnimation = () => {
    progress.stopAnimation();
  };

  const handlePhaseComplete = () => {
    setIsPlaying(false);
    stopAnimation();
    progress.setValue(0);

    if (currentPhase === 'respiracao') {
      setCurrentPhase('meditacao');
    } else {
      setAllComplete(true);
    }
  };

  const handlePlay = async () => {
    try {
      if (!isPlaying) {
        await player.play();
        setIsPlaying(true);
        startAnimation();
      } else {
        await player.pause();
        setIsPlaying(false);
        stopAnimation();
      }
    } catch (error) {
      console.log('Erro no player:', error);
    }
  };

  const handlePular = () => {
    stopAnimation();
    player.pause();
    if (onComplete) onComplete(true);
  };

  useEffect(() => {
    return () => {
      stopAnimation();
      player.pause();
    };
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const getPhaseTitle = () => {
    if (currentPhase === 'respiracao') {
      return `Exercício de respiração (${tempoRespiracao || 5}min)`;
    }
    return 'Meditação guiada (3min)';
  };

  const getTimeDisplay = () => {
    const totalSeconds = duracao;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{getPhaseTitle()}</Text>

      <View style={styles.playerContainer}>
        <View style={styles.circleContainer}>
          <Svg
            height={radius * 2 + strokeWidth}
            width={radius * 2 + strokeWidth}
          >
            <Circle
              stroke={theme.terciario}
              fill="none"
              cx={centerX}
              cy={centerY}
              r={radius}
              strokeWidth={strokeWidth}
              opacity={0.3}
            />
            
            <AnimatedCircle
              stroke={theme.success}
              fill="none"
              cx={centerX}
              cy={centerY}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              originX={centerX}
              originY={centerY}
            />
          </Svg>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{getTimeDisplay()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlay}
          activeOpacity={0.7}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.phaseIndicator}>
        <View style={[
          styles.phaseStep,
          currentPhase === 'respiracao' && styles.phaseStepActive
        ]} />
        <View style={[
          styles.phaseStep,
          currentPhase === 'meditacao' && styles.phaseStepActive
        ]} />
      </View>

      <ButtonPrimary
        title={allComplete ? 'Concluir' : 'Pular'}
        onPress={handlePular}
        height={40}
      />
    </ScrollView>
  );
}