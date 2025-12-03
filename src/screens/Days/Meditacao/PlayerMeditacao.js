import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/PlayerMeditacao';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GlassBox from '../../../components/GlassBox';
import { useAudioPlayer } from 'expo-audio';

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
                ? require('../../../../assets/icons/Pause.png')
                : require('../../../../assets/icons/Play.png')
            }
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PlayerMeditacao({ selectedPath, semanaAtual, onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [timeRespiracao, settimeRespiracao] = useState(0);
  const [timeMeditacao, settimeMeditacao] = useState(10);
  const [respiracaoAtivada, setrespiracaoAtivada] = useState(false);
  const { buscarConfigRespiracao } = useJourney();

  useEffect(() => {
    const carregarConfig = async () => {
      const config = await buscarConfigRespiracao();
      if (config && config.ativado && config.tempo) {
        settimeRespiracao(config.tempo);
        setrespiracaoAtivada(config.ativado);
      } else {
        settimeRespiracao(5);
      }
    };
    carregarConfig();
  }, []);

  const [allComplete, setAllComplete] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.spacerBox}>
        {respiracaoAtivada ? (
          <GlassBox>
            <Text style={styles.text}>Exercício de respiração</Text>
            <Timer
              initialSeconds={timeRespiracao * 60}
              source="https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3"
            />
          </GlassBox>
        ) : null}
      </View>

      <GlassBox>
        <Text style={styles.text}>Meditação</Text>
        <Timer
          initialSeconds={timeMeditacao * 60}
          source="https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena3%20Tratado.mp3"
        />
      </GlassBox>

      <ButtonPrimary
        title={allComplete ? 'Concluir' : 'Pular Prática'}
        onPress={() => onComplete(true)}
        height={40}
      />
    </View>
  );
}
