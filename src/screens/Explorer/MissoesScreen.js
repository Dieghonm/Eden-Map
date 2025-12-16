// src/screens/Explorer/MissoesScreen.js - REFATORADO
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/MissoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import NavigationControls from '../../components/NavigationControls';
import { MISSAO } from '../../../assets/json/Semanas';

export default function MissoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath } = useApp();
  const { missoesConcluidas } = useJourney();

  const caminhos = Object.keys(MISSAO);
  const caminhosOrdenados = [
    selectedPath,
    ...caminhos.filter(c => c !== selectedPath)
  ];

  const listaCompleta = caminhosOrdenados.flatMap(c =>
    MISSAO[c]
      .filter(m => m.Titulo)
      .map(m => ({ caminho: c, ...m }))
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = listaCompleta.length;
  const current = listaCompleta[currentIndex];

  const totalEstrelas = current.estrelas;

  const filtrado = missoesConcluidas.find(
    item => item && item.titulo === current.Titulo
  );

  const concluida = filtrado?.concluida === true;

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handleNext() {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <GlassBox>
        <View style={styles.starsView}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              source={
                index < totalEstrelas
                  ? require("../../../assets/StarOn.png")
                  : require("../../../assets/StarOff.png")
              }
              style={styles.stars}
            />
          ))}
        </View>

        <Text style={styles.titulo}>{current.Titulo}</Text>

        {current.img && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: current.img }} 
              style={[
                styles.imageConcluida,
                { opacity: concluida ? 1 : 0.3 }
              ]}
              resizeMode="cover"
            />
          </View>
        )}

        {!concluida && (
          <Image 
            style={styles.lockImage} 
            source={require("../../../assets/Lock.png")} 
          />
        )}

        <Text style={styles.missao}>{current.Missão}</Text>
      </GlassBox>

      <NavigationControls
        currentIndex={currentIndex}
        total={total}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <ButtonPrimary
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}