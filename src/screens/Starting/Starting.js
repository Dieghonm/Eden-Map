import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Starting';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import PlayButton from '../../components/PlayButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import { spacing } from '../../theme/texts';

export default function Starting() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Logo width={spacing.lg} height={spacing.md} />
      <View style={styles.introText}>
        <WelcomeText
          style={styles.introText}
          title='Introdução'
          subtitle='No Eden Map, sua jornada começa com um desejo profundo.'
        />
      </View>

      <Text style={styles.description}>
        Escute o áudio de <Text style={styles.highlight}>2 min</Text> abaixo e descubra a{' '}
        <Text style={styles.highlight}>melhor maneira de fazer seu desejo.</Text> 
      </Text>
      
      <PlayButton 
        text='Tutorial - Desejo'
        source={require('../../../assets/audios/TutorialDesejo.mp3')}
        duration={150}
      />
      
      <Text style={styles.guideText}>
        Veja o nosso guia em <Text style={styles.highlight}>3 passos</Text>, e entenda como funciona a plataforma.
      </Text>
      
      <ButtonPrimary
        title='Iniciar guia'
        onPress={() => console.log('Iniciar guia pressionado')}
      />
    </View>
  );
}