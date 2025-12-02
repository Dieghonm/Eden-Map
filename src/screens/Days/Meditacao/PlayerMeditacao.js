import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/PlayerMeditacao';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GlassBox from '../../../components/GlassBox';
import { useAudioPlayer } from 'expo-audio';

function Timer({ initialSeconds, source }) {
  const [time, setTime] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  const player = useAudioPlayer(
    source
      ? typeof source === 'string'
        ? { uri: source }
        : source
      : null
  );

  useEffect(() => {
    setTime(initialSeconds);
    setRunning(false);
    progress.setValue(0);
    if (player) player.stop();
  }, [initialSeconds]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1 - time / initialSeconds,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [time, initialSeconds]);

  useEffect(() => {
    let interval = null;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }
    if (time === 0) {
      setRunning(false);
      if (player) player.stop();
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const togglePlay = () => {
    const next = !running;
    setRunning(next);
    if (!player) return;
    if (next) player.play();
    else player.pause();
  };

  const format = (v) =>
    String(Math.floor(v / 60)).padStart(2, '0') +
    ':' +
    String(v % 60).padStart(2, '0');

  const knobTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 260],
  });

  const barFillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ width: '100%' }}>
      <View style={{ width: '100%', marginTop: 10 }}>
        <View
          style={{
            width: '100%',
            height: 4,
            backgroundColor: 'white',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={{
              height: 4,
              width: barFillWidth,
              backgroundColor: '#38C197',
            }}
          />
        </View>

        <Animated.View
          style={{
            width: 18,
            height: 18,
            borderRadius: 18,
            backgroundColor: '#38C197',
            position: 'absolute',
            top: -7,
            transform: [{ translateX: knobTranslate }],
          }}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>
          {format(time)}
        </Text>

        <TouchableOpacity
          onPress={togglePlay}
          style={{
            width: 48,
            height: 48,
            borderRadius: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={
              running
                ? require('../../../../assets/icons/Pause.png')
                : require('../../../../assets/icons/Play.png')
            }
            style={{ width: 50, height: 50 }}
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
  const { buscarConfigRespiracao } = useJourney();

  useEffect(() => {
    const carregarConfig = async () => {
      const config = await buscarConfigRespiracao();
      if (config && config.ativado && config.tempo) settimeRespiracao(config.tempo);
      else settimeRespiracao(5);
    };
    carregarConfig();
  }, []);

  const [allComplete, setAllComplete] = useState(false);

  return (
    <View>
      <GlassBox>
        <Text>Exercício de respiração</Text>
        <Timer
          initialSeconds={timeRespiracao * 60}
          source={
            'https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3'
          }
        />
      </GlassBox>

      <GlassBox>
        <Text>Meditação</Text>
        <Timer
          initialSeconds={timeMeditacao * 60}
          source={
            'https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena3%20Tratado.mp3'
          }
        />
      </GlassBox>

      <GlassBox>
        <Text>Teste rápido</Text>
        <Timer initialSeconds={10} />
      </GlassBox>

      <ButtonPrimary
        title={allComplete ? 'Concluir' : 'Pular Prática'}
        onPress={() => onComplete(true)}
        height={40}
      />
    </View>
  );
}
