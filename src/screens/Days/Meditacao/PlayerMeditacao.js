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

  const [currentPhase, setCurrentPhase] = useState('respiracao');
  const [isPlaying, setIsPlaying] = useState(false);
  const [allComplete, setAllComplete] = useState(false);

  const audioUrl = "https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3";

  console.log(selectedPath, semanaAtual);
  console.log(tempoRespiracao);
  

  return (
    <View>
      <ButtonPrimary
        title={allComplete ? 'Concluir' : 'Pular Prática'}
        onPress={()=> onComplete(true)}
        height={40}
      />
    </View>
  );
}