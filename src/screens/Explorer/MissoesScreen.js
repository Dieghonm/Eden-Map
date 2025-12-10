import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/MissoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { MISSAO } from '../../../assets/json/Semanas';

export default function MissoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedTab, setSelectedTab] = useState('app');
 
  const appData = useApp();
  const {
    user,
    selectedPath,
    semanaAtual,
    diaAtual,
  } = appData;

  const journeyData = useJourney();
  const {
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    meditacaoRespostas,
    missoesConcluidas,
  } = journeyData;
  
  // console.log(MISSAO[selectedPath]);

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

  const totalEstrelas =
    missoesConcluidas && missoesConcluidas[current.caminho]
      ? missoesConcluidas[current.caminho]
      : 1;
  console.log(missoesConcluidas.concluida);
  
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

        <Text style={styles.caminho}>{current.caminho}</Text>
        <Text style={styles.titulo}>{current.Titulo}</Text>

        {current.img && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: current.img }} 
              style={styles.imageConcluida}
              resizeMode="cover"
            />
          </View>
        )}

        <Text style={styles.missao}>{current.Missão}</Text>
      </GlassBox>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={[
            styles.navIcon,
            currentIndex === 0 && styles.navIconDisabled
          ]}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1}/{total}
        </Text>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={handleNext}
          disabled={currentIndex === total - 1}
        >
          <Text style={[
            styles.navIcon,
            currentIndex === total - 1 && styles.navIconDisabled
          ]}>▶</Text>
        </TouchableOpacity>
      </View>

      <ButtonPrimary
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
