import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const PHRASES = [
  'Preparando seu espaço de calma',
  'Carregando suas meditações',
  'Organizando reflexões para você',
  'Ajustando sons e imagens',
  'Criando um momento de presença',
  'Conectando você ao agora',
  'Respire fundo, estamos quase lá',
  'Sincronizando sua jornada interior',
  'Preparando conteúdos com carinho',
  'Tudo pronto para desacelerar',
  'Montando seu refúgio mental',
  'Aquietando o ambiente',
  'Alinhando mente e corpo',
  'Organizando seus momentos de pausa',
  'Preparando experiências conscientes',
  'Afinando sua energia',
  'Abrindo espaço para o silêncio',
  'Conectando inspiração e presença',
  'Criando um tempo só seu',
  'Bem-vindo ao seu momento'
];

export default function ServerLoadingScreen({ texto }) {
  const { theme } = useTheme();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dotStep, setDotStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotStep(prev => {
        if (prev === 3) {
          setPhraseIndex(index =>
            index + 1 < PHRASES.length ? index + 1 : 0
          );
          return 0;
        }
        return prev + 1;
      });
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  const dots = '.'.repeat(dotStep);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.button} />

      <Text
        style={{
          marginTop: 24,
          fontSize: 18,
          fontWeight: '600',
          color: theme.button,
          textAlign: 'center',
          paddingHorizontal: 24,
          width: 250
        }}
      >
        {PHRASES[phraseIndex]}{dots}
      </Text>

      <Text
        style={{
          marginTop: 12,
          fontSize: 14,
          color: theme.fontColor,
          width: 250,
          textAlign: 'center'
        }}
      >
        Estamos preparando tudo{'\n'}
        só leva um minutinho
      </Text>

        {/* <Text style={{ marginTop: 12, color: theme.fontColor }}>
          {texto? 'Ligado': 'Desligado'}
        </Text> */}

    </View>
  );
}
