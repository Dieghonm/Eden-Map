import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import ImgButton from '../../components/ImgButton';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { trackingRespostas = {}, perguntasRespostas, cenasRespostas } = useJourney();

  const [respostasScreen, setRespostasScreen] = useState(false);
  const [cenasList, setCenasList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const values = [
    trackingRespostas.triste ?? 0.01,
    trackingRespostas.neutro ?? 0.01,
    trackingRespostas.feliz ?? 0.01
  ];

  useEffect(() => {
    const lista = [];

    cenasRespostas.forEach(item => {
      if (Array.isArray(item.cenas)) {
        const dataFormatada = new Date(item.timestamp).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });

        item.cenas.forEach(cena => {
          lista.push({
            data: dataFormatada,
            ...cena
          });
        });
      }
    });

    setCenasList(lista);
    setCurrentIndex(0);
  }, [cenasRespostas]);

  const handleNext = () => {
    if (currentIndex < cenasList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const cenaAtual = cenasList[currentIndex];

  const barColors = [
    theme.warning,
    theme.alert,
    theme.success,
  ];

  const totalBars = values.reduce((a, b) => a + b, 0) || 1;
  const maxBarHeight = 100;

  if (respostasScreen === 'respostas') {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <GlassBox />

          <ButtonPrimary
            title="Voltar"
            onPress={() => setRespostasScreen(false)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (respostasScreen === 'cenas') {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {cenaAtual && (
            <>
              <Text style={styles.data}>{cenaAtual.data}  -  Cena: {cenaAtual.cena}</Text>
              <GlassBox>
                  <Text style={styles.cena}>{cenaAtual.pergunta}</Text>
                  <Text style={styles.pergunta}>Onde se passa sua cena?</Text>
                  <Text style={styles.resposta}>{cenaAtual.onde}</Text>
                  <Text style={styles.pergunta}>Quem estava ao seu redor?</Text>
                  <Text style={styles.resposta}>{cenaAtual.quem}</Text>
                  <Text style={styles.pergunta}>Qual era o contexto ou ação?</Text>
                  <Text style={[styles.resposta, styles.acao]}>{cenaAtual.acao}</Text>
              </GlassBox>
            </>
          )}

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
              {currentIndex + 1}/{cenasList.length}
            </Text>

            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
              disabled={currentIndex === cenasList.length - 1}
            >
              <Text style={[
                styles.navIcon,
                currentIndex === cenasList.length - 1 && styles.navIconDisabled
              ]}>▶</Text>
            </TouchableOpacity>
          </View>

          <ButtonPrimary
            title="Voltar"
            onPress={() => setRespostasScreen(false)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Como você se sentiu durante a sua jornada?
        </Text>

        <GlassBox>
          <View style={styles.chartContainer}>
            <View style={styles.barsRow}>
              {values.map((value, index) => {
                const height = (value / totalBars) * maxBarHeight;

                return (
                  <View key={index} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor: barColors[index],
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.separator} />

            <View style={styles.iconsRow}>
              <View style={styles.iconBox}>
                <Image source={require("../../../assets/icons/Triste.png")} style={styles.icon} resizeMode="contain" />
              </View>
              <View style={styles.iconBox}>
                <Image source={require("../../../assets/icons/Neutro.png")} style={styles.icon} resizeMode="contain" />
              </View>
              <View style={styles.iconBox}>
                <Image source={require("../../../assets/icons/Feliz.png")} style={styles.icon} resizeMode="contain" />
              </View>
            </View>

            <View style={styles.labelsRow}>
              {values.map((value, index) => {
                const percentage = Math.round((value / totalBars) * 100);

                return (
                  <Text key={index} style={styles.barLabel}>
                    {percentage}%
                  </Text>
                );
              })}
            </View>
          </View>
        </GlassBox>

        <Text style={styles.subtitle}>
          Quanto
          <Text style={styles.highlight}> mais positivo </Text>
          for esse balanço, mais fácil se torna,
          <Text style={styles.highlight}> atrair seu desejo</Text>.
        </Text>

        <View style={styles.spacer}>
          <ImgButton title="Descrição de cena" img="DESCRICAOCENA" onPress={() => setRespostasScreen('cenas')} />
          <ImgButton title="Suas respostas" img="ExpLuz" onPress={() => setRespostasScreen('respostas')} />
          <ButtonPrimary title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
