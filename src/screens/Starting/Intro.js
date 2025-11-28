import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';

import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import PlayButton from '../../components/PlayButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import { spacing } from '../../theme/texts';
import { createStyles } from '../../styles/Starting/Intro';

export default function Intro({onStartGuide}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Escute o áudio de <Text style={styles.highlight}>2 min</Text> abaixo e descubra a{' '}
        <Text style={styles.highlight}>melhor maneira de fazer seu desejo.</Text> 
      </Text>
      
      <PlayButton 
        text="Tutorial - Desejo"
        source="https://dccnvoncldisnxpvijco.supabase.co/storage/v1/object/public/Eden%20Map%20Audios/AtencaoPlena1%20Tratado.mp3"
        duration={150}
      />
      
      <Text style={styles.guideText}>
        Veja o nosso guia em <Text style={styles.highlight}>3 passos</Text>, e entenda como funciona a plataforma.
      </Text>
      
      <ButtonPrimary
        title='Iniciar guia'
        onPress={onStartGuide}
      />
    </View>
  );
}