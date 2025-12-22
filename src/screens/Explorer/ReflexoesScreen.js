import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { useTheme } from '../../context/ThemeProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import ImgButton from '../../components/ImgButton';
import NavigationControls from '../../components/NavigationControls';
import { PERGUNTAS } from '../../../assets/json/Semanas';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { trackingRespostas = {}, perguntasRespostas = [], cenasRespostas = [] } = useJourney();

  const [respostasScreen, setRespostasScreen] = useState(false);

  const [cenasList, setCenasList] = useState([]);
  const [currentCenaIndex, setCurrentCenaIndex] = useState(0);

  const [respostaIndex, setRespostaIndex] = useState(0);

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
    setCurrentCenaIndex(0);
  }, [cenasRespostas]);

  const respostasList = perguntasRespostas
    .map((item, index) => item ? { ...item, originalIndex: index + 1 } : null)
    .filter(Boolean);

  const cenaAtual = cenasList[currentCenaIndex];
  const respostaAtual = respostasList[respostaIndex];

  const totalBars = values.reduce((a, b) => a + b, 0) || 1;
  const maxBarHeight = 100;

  const barColors = [
    theme.warning,
    theme.alert,
    theme.success,
  ];

  const tipoResposta = respostaAtual && [5, 6, 7, 8].includes(respostaAtual.semana)
    ? 'Sombra'
    : 'Luz';

  // ============================================================================
  // TELA: RESPOSTAS
  // ============================================================================
  if (respostasScreen === 'respostas') {
    return (
      <View style={styles.container} >
        <ScrollView contentContainerStyle={styles.scrollContentResposta} showsVerticalScrollIndicator={false}>
          {tipoResposta == 'Sombra'?
           <ImgButton title={'Pergunta: Sombra'} img={'ExpSombra'}/> : 
           <ImgButton title={'Pergunta: Luz'} img={'ExpLuz'}/>
          }
       
          {respostasList.length === 0 ? (
            <GlassBox>
              <Text style={styles.cena}>Nenhuma resposta registrada ainda.</Text>
            </GlassBox>
          ) : (
            <>
              <Text style={styles.respostaData}>
                Respondido em:{' '}
                {new Date(respostaAtual.timestamp).toLocaleDateString('pt-BR')}
              </Text>
              <GlassBox>
                <Text style={styles.pergunta}>{PERGUNTAS[respostaAtual.path ][respostaAtual.semana].Pergunta}</Text>
                <Text style={[styles.resposta, styles.respostaAcao]}>
                  {respostaAtual.resposta}
                </Text>
              </GlassBox>

              <NavigationControls
                currentIndex={respostaIndex}
                total={respostasList.length}
                onPrevious={() => setRespostaIndex(i => Math.max(i - 1, 0))}
                onNext={() => setRespostaIndex(i => Math.min(i + 1, respostasList.length - 1))}
              />
            </>
          )}

          <ButtonPrimary title="Voltar" onPress={() => setRespostasScreen(false)} />
        </ScrollView>
      </View>
    );
  }

  // ============================================================================
  // TELA: CENAS
  // ============================================================================
  if (respostasScreen === 'cenas') {
    return (
      <View style={styles.container} >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {cenaAtual && (
            <>
              <Text style={styles.data}>
                {cenaAtual.data}  -  Cena: {cenaAtual.cena}
              </Text>

              <GlassBox>
                <Text style={styles.cena}>{cenaAtual.pergunta}</Text>

                <Text style={styles.pergunta}>Onde se passa sua cena?</Text>
                <Text style={styles.resposta}>{cenaAtual.onde}</Text>

                <Text style={styles.pergunta}>Quem estava ao seu redor?</Text>
                <Text style={styles.resposta}>{cenaAtual.quem}</Text>

                <Text style={styles.pergunta}>Qual era o contexto ou ação?</Text>
                <Text style={[styles.resposta, styles.acao]}>
                  {cenaAtual.acao}
                </Text>
              </GlassBox>
            </>
          )}

          <NavigationControls
            currentIndex={currentCenaIndex}
            total={cenasList.length}
            onPrevious={() => setCurrentCenaIndex(i => Math.max(i - 1, 0))}
            onNext={() => setCurrentCenaIndex(i => Math.min(i + 1, cenasList.length - 1))}
          />

          <ButtonPrimary title="Voltar" onPress={() => setRespostasScreen(false)} />
        </ScrollView>
      </View>
    );
  }

  // ============================================================================
  // TELA: PRINCIPAL
  // ============================================================================
  return (
    <View style={styles.container} >
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
                    <View style={[styles.bar, { height, backgroundColor: barColors[index] }]} />
                  </View>
                );
              })}
            </View>

            <View style={styles.separator} />

            <View style={styles.iconsRow}>
              <View style={styles.iconBox}>
                <Image source={require('../../../assets/icons/Triste.png')} style={styles.icon} />
              </View>
              <View style={styles.iconBox}>
                <Image source={require('../../../assets/icons/Neutro.png')} style={styles.icon} />
              </View>
              <View style={styles.iconBox}>
                <Image source={require('../../../assets/icons/Feliz.png')} style={styles.icon} />
              </View>
            </View>

            <View style={styles.labelsRow}>
              {values.map((value, index) => (
                <Text key={index} style={styles.barLabel}>
                  {Math.round((value / totalBars) * 100)}%
                </Text>
              ))}
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
    </View>
  );
}
