// src/screens/Days/Meditacao/IntroMeditacao.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { DESCRICAOCENA } from '../../../../assets/json/Semanas';
import { createStyles } from '../../../styles/Days/IntroMeditacao';
import Img from '../../../components/Img';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecundary from '../../../components/ButtonSecundary';
import GlassBox from '../../../components/GlassBox';

export default function IntroMeditacao({ selectedPath, semanaAtual, onRelembrar, onRespiracao }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const data = DESCRICAOCENA[pathKey]?.[semanaAtual - 1];
  const cenaKey = 'Cena 1';
  const textoCena = data?.[cenaKey] || '';

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Img
          source={require('../../../../assets/42.png')}
          size={220}
        />
      </View>

      <Text style={styles.title}>
        Desejo relembrar a cena abaixo antes de praticar?
      </Text>

      <Text style={styles.pergunta}>{textoCena}</Text>

      <ButtonPrimary
        title="Relembrar cena"
        onPress={onRelembrar}
        height={40}
      />

      <ButtonSecundary
        title="Ir para respiração"
        onPress={onRespiracao}
        height={40}
      />

    </ScrollView>
  );
}