import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/PlayerMeditacao';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GlassBox from '../../../components/GlassBox';
import { useAudioPlayer } from 'expo-audio';
import HeaderAjuster from '../../../components/HeaderAjuster';

function Timer({ initialSeconds, source, autoPlaySignal, onFinish }) {
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
    try {
      player && player.pause();
    } catch {}
  }, [initialSeconds]);

  useEffect(() => {
    if (!autoPlaySignal || running) return;
    setRunning(true);
    try {
      player && player.play();
    } catch {}
  }, [autoPlaySignal]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1 - time / initialSeconds,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [time]);

  useEffect(() => {
    let interval = null;

    if (running && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    }

    if (running && time === 0) {
      setRunning(false);
      try {
        player && player.pause();
      } catch {}
      onFinish && onFinish();
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const togglePlay = () => {
    const next = !running;
    setRunning(next);
    try {
      player && (next ? player.play() : player.pause());
    } catch {}
  };

  const format = v =>
    String(Math.floor(v / 60)).padStart(2, '0') +
    ':' +
    String(v % 60).padStart(2, '0');

  return (
    <View style={styles.timerBox}>
      <View style={styles.progress}>
        <Animated.View
          style={[
            styles.marcador,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        />
      </View>

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

export default function PlayerMeditacao({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { buscarConfigRespiracao } = useJourney();

  const [timeRespiracao, setTimeRespiracao] = useState(5);
  const [timeMeditacao, setTimeMeditacao] = useState(10);
  const [respiracaoAtivada, setRespiracaoAtivada] = useState(false);
  const [startMeditacaoSignal, setStartMeditacaoSignal] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    const carregarConfig = async () => {
      const config = await buscarConfigRespiracao();
      if (config?.ativado && config?.tempo) {
        setRespiracaoAtivada(true);
        setTimeRespiracao(config.tempo);
      } else {
        setRespiracaoAtivada(false);
      }
    };
    carregarConfig();
  }, []);

  const handleRespiracaoFinish = () => {
    setTimeout(() => {
      setStartMeditacaoSignal(v => v + 1);
    }, 3000);
  };

  const handleMeditacaoFinish = () => {
    setAllComplete(true);
  };

  return (
    <View style={styles.container}>
      <HeaderAjuster />

      <View style={styles.topSpacer} />

      {respiracaoAtivada && (
        <GlassBox>
          <Text style={styles.text}>Exercício de respiração</Text>
          <Timer
            initialSeconds={timeRespiracao * 60}
            source="https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3"
            onFinish={handleRespiracaoFinish}
          />
        </GlassBox>
      )}

      <GlassBox>
        <Text style={styles.text}>Meditação</Text>
        <Timer
          initialSeconds={timeMeditacao * 60}
          source="https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena3%20Tratado.mp3"
          autoPlaySignal={startMeditacaoSignal}
          onFinish={handleMeditacaoFinish}
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
