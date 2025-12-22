// src/screens/Explorer/MeditacoesScreen.js - REFATORADO
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';

import { useAudioPlayer } from 'expo-audio';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/MeditacoesScreen';
import ButtonSecundary from '../../components/ButtonSecundary';
import ButtonPrimary from '../../components/ButtonPrimary';
import NavigationControls from '../../components/NavigationControls';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import { MISSAO } from '../../../assets/json/Semanas';
import GlassBox from '../../components/GlassBox';

// ============================================================================
// 🎵 COMPONENTE TIMER
// ============================================================================
function Timer({ initialSeconds, source }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [time, setTime] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const player = useAudioPlayer(
    source ? (typeof source === 'string' ? { uri: source } : source) : null
  );

  useEffect(() => {
    setTime(initialSeconds);
    setRunning(false);
    progress.setValue(0);
    if (player) {
      try {
        player.pause();
        if (player.seekTo) player.seekTo(0);
      } catch (e) {}
    }
  }, [initialSeconds]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1 - time / initialSeconds,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [time, initialSeconds]);

  useEffect(() => {
    let interval = null;
    if (running && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    }
    if (running && time === 0) {
      setRunning(false);
      if (player) {
        try {
          player.pause();
          if (player.seekTo) player.seekTo(0);
        } catch (e) {}
      }
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const togglePlay = () => {
    const next = !running;
    setRunning(next);
    if (!player) return;
    try {
      if (next) player.play();
      else player.pause();
    } catch (e) {}
  };

  useEffect(() => {
    return () => {
      try {
        if (player) player.pause();
      } catch (e) {}
    };
  }, []);

  const format = v =>
    String(Math.floor(v / 60)).padStart(2, '0') +
    ':' +
    String(v % 60).padStart(2, '0');

  const knobTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 260]
  });

  const barFillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.timerBox}>
      <View style={styles.progress}>
        <Animated.View style={[styles.marcador, { width: barFillWidth }]} />
      </View>

      <Animated.View style={[styles.icon, { transform: [{ translateX: knobTranslate }] }]} />

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{format(time)}</Text>

        <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
          <Image
            source={
              running
                ? require('../../../assets/icons/Pause.png')
                : require('../../../assets/icons/Play.png')
            }
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ============================================================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================================================
export default function MeditacoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedMedit, setSelectedMedit] = useState(null); 

  const keyMap = {
    "Atenção Plena": "Atencao_Plena",
    "Motivação": "Motivacao"
  };

  const chave = keyMap[selectedPath?.nome] || selectedPath?.nome;
  const lista = selectedPath ? (MISSAO[chave] || []) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = lista.length / 2;
  const current = lista[currentIndex * 2];

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handleNext() {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  }

  // ============================================================================
  // 📱 TELA 1: SELEÇÃO DE CAMINHO
  // ============================================================================
  if (!selectedPath) {
    return (
      <View style={styles.container} >
        <Text style={styles.title}>Escolha qualquer meditação da biblioteca</Text>
        <Text style={styles.text}>Mais de 35 opções disponíveis.</Text>

        {CAMINHOS.map((path) => (
          <TouchableOpacity
            key={path.nome}
            style={[styles.pathButton, { borderColor: path.color, borderWidth: 2 }]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedPath(path);
              setCurrentIndex(0);
            }}
          >
            <Text style={styles.pathText}>{path.nome}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.pathButton, { borderColor: '#EFFB3E', borderWidth: 2 }]}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedPath({ nome: 'Outros', color: '#EFFB3E' });
            setCurrentIndex(0);
          }}
        >
          <Text style={styles.pathText}>Extras</Text>
        </TouchableOpacity>

        <ButtonSecundary 
          title={'Voltar'} 
          onPress={() => navigation.goBack()} 
        />
      </View>
    );
  }

  // ============================================================================
  // 📱 TELA 2: SELEÇÃO DE MEDITAÇÃO ESPECÍFICA
  // ============================================================================
  if (!selectedMedit) {
    return (
      <View style={styles.container} >
        <View style={styles.spacing}/>
        
        <Text style={[styles.title, { color: selectedPath.color }]}>
          {selectedPath.nome}
        </Text>

        <GlassBox>
          <Text style={styles.tema}>
            {current ? `Tema: ${current.Titulo}` : "Sem itens disponíveis"}
          </Text>
          {current && current.img && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: current.img }} 
                style={styles.imageConcluida}
                resizeMode="cover"
              />
            </View>
          )}
        </GlassBox>

        <NavigationControls
          currentIndex={currentIndex}
          total={total}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <ButtonPrimary 
          title={'Escolher e avançar'} 
          onPress={() => setSelectedMedit(current)} 
        />

        <ButtonSecundary 
          title={'Voltar'} 
          onPress={() => setSelectedPath(null)} 
        />
      </View>
    );
  }

  // ============================================================================
  // 📱 TELA 3: PLAYER DE MEDITAÇÃO
  // ============================================================================
  return (
    <View style={styles.container} >
      <View style={styles.spacerBox} />

      <GlassBox>
        <Text style={styles.playerText}>
          Meditação: {selectedMedit.Titulo}
        </Text>
        <Timer
          initialSeconds={10 * 60}
          source={selectedMedit.audioMeditacao}
        />
      </GlassBox>

      <ButtonPrimary
        title="Concluir"
        onPress={() => {
          setSelectedMedit(null);
          setSelectedPath(null);
        }}
        height={40}
      />

      <ButtonSecundary
        title="Voltar"
        onPress={() => setSelectedMedit(null)}
        height={40}
      />
    </View>
  );
}