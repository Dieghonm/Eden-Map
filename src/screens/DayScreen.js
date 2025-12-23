// src/screens/DayScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import ConfettiCannon from 'react-native-confetti-cannon';

import { useTheme } from '../context/ThemeProvider';
import { useApp } from '../context/AppProvider';

import { createStyles } from '../styles/DayScreen';
import { SEMANAS, CALENDAR } from '../../assets/json/Semanas';

import ImgButton from '../components/ImgButton';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecundary from '../components/ButtonSecundary';

import { horizontalScale, verticalScale } from '../utils/responsive';

import CenaDay from './Days/CenaDay';
import VideoDay from './Days/VideoDay';
import MissaoDay from './Days/MissaoDay';
import TrakingDay from './Days/TrakingDay';
import PerguntasDay from './Days/PerguntasDay';
import MeditacaoScreen from './Days/MeditacaoScreen';
import HeaderAjuster from '../components/HeaderAjuster';

export default function DayScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const {
    semanaAtual,
    diaAtual,
    selectedPath,
    avancarDia,
  } = useApp();

  const SEMANA = SEMANAS[semanaAtual - 1];
  const DIA = CALENDAR[diaAtual - 1];

  const [currentScreen, setCurrentScreen] = useState('');
  const [entradaScreen, setEntradaScreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showParabens, setShowParabens] = useState(false);
  const [concluindoDia, setConcluindoDia] = useState(false);

  const [statusDiaAtual, setStatusDiaAtual] = useState({
    exercicioConcluido: DIA.exercicio === '',
    meditacaoLiberada: DIA.exercicio === '',
    meditacaoConcluida: false,
  });

  const buttonText = () => {
    switch (DIA.exercicio) {
      case 'DESCRICAOCENA':
        return 'Descreva a Cena';
      case 'VIDEOS':
        return 'Vídeo';
      case 'MISSAO':
        return 'Missão';
      case 'TRACKING':
        return 'Reflexões';
      case 'PERGUNTAS':
        return [5, 6, 7, 8].includes(semanaAtual)
          ? 'Pergunta: Sombra'
          : 'Pergunta: Luz';
      default:
        return '';
    }
  };

  const handleExercicioComplete = sucesso => {
    if (!sucesso) return;

    setCurrentScreen('');
    setStatusDiaAtual(prev => ({
      ...prev,
      exercicioConcluido: true,
      meditacaoLiberada: true,
    }));
  };

  const handleMeditacaoComplete = sucesso => {
    if (!sucesso) return;

    setCurrentScreen('');
    setStatusDiaAtual(prev => ({
      ...prev,
      meditacaoConcluida: true,
    }));
  };

  const handleConcluirDia = async () => {
    if (concluindoDia) return;

    setConcluindoDia(true);
    setShowConfetti(true);
    setShowParabens(true);

    setTimeout(async () => {
      await avancarDia();
      setCurrentScreen('');
      setEntradaScreen(false);

      const proximoDia = CALENDAR[diaAtual] || DIA;

      setStatusDiaAtual({
        exercicioConcluido: proximoDia.exercicio === '',
        meditacaoLiberada: proximoDia.exercicio === '',
        meditacaoConcluida: false,
      });

      setShowConfetti(false);
      setShowParabens(false);
      setConcluindoDia(false);
    }, 1500);
  };

  const diaCompleto =
    statusDiaAtual.exercicioConcluido &&
    statusDiaAtual.meditacaoConcluida;

  const renderCompletedButton = () => (
    <ImgButton title="Finalizado" img="Checked" onPress={() => {}} />
  );

  const getFaseInfo = () => {
    if (semanaAtual >= 1 && semanaAtual <= 4) {
      return {
        numero: 1,
        tipo: 'Exercícios de luz',
        descricao: [
          'Aqui, a ',
          'gratidão abre a porta da mudança.',
          ' Ela atrai sentimentos ',
          'elevados',
          ' e te ensina a ',
          'abraçar o presente',
          ' com leveza.'
        ]
      };
    } else if (semanaAtual >= 5 && semanaAtual <= 8) {
      return {
        numero: 2,
        tipo: 'Exercícios de sombra',
        descricao: [
          'Aqui você vai ',
          'entender os seus medos',
          ' e ',
          'reprogramar ',
          'a forma como a ',
          'mente',
          ' os interpreta.'
        ]
      };
    } else {
      return {
        numero: 3,
        tipo: 'Exercícios de luz',
        descricao: [
          'Aqui a',
          ' mente',
          ' se torna espelho do que você quer ',
          'viver',
          '. A ',
          'visualização revela o caminho',
          ' do desejo à realidade.'
        ]
      };
    }
  };

  switch (currentScreen) {
    case 'DESCRICAOCENA':
      return <CenaDay onComplete={handleExercicioComplete} />;
    case 'VIDEOS':
      return <VideoDay onComplete={handleExercicioComplete} />;
    case 'MISSAO':
      return <MissaoDay onComplete={handleExercicioComplete} />;
    case 'TRACKING':
      return <TrakingDay onComplete={handleExercicioComplete} />;
    case 'PERGUNTAS':
      return <PerguntasDay onComplete={handleExercicioComplete} />;
    case 'MEDITACAO':
      return <MeditacaoScreen onComplete={handleMeditacaoComplete} />;
    default:
      break;
  }

  if (!entradaScreen) {
    const concluidos = 7 * (semanaAtual - 1) + diaAtual - 1;
    const total = 84;
    const porcentagem = Math.round((concluidos / total) * 100);
    const faseInfo = getFaseInfo();

    return (
      <View style={styles.entradaContainer}>
        <View style={styles.headerEntrada}>
          <Text style={styles.diaText}>Dia {diaAtual} - Semana {semanaAtual}</Text>
          <Text style={styles.faseTitle}>Fase {faseInfo.numero} - {faseInfo.tipo}</Text>
          <Text style={styles.faseDescricao}>
            {faseInfo.descricao[0]}
            <Text style={styles.highlight}>{faseInfo.descricao[1]}</Text>
            {faseInfo.descricao[2]}
            <Text style={styles.highlight}>{faseInfo.descricao[3]}</Text>
            {faseInfo.descricao[4]}
            {faseInfo.descricao[5] && <Text style={styles.highlight}>{faseInfo.descricao[5]}</Text>}
            {faseInfo.descricao[6] || ''}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: SEMANA.img }}
            style={styles.semanaImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressPercentage}>{porcentagem}%</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${porcentagem}%` }]} />
            </View>
          </View>
        </View>

        <View>
          <ButtonPrimary
            title="Entrar no Eden"
            onPress={() => setEntradaScreen(true)}
          />
          <ButtonSecundary
            title="Voltar"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderAjuster />
      <View style={styles.gap}>
        <View style={styles.TextContainer}>
          <Text style={styles.Title}>{SEMANA.nome}</Text>
          <Text style={styles.Text}>
            <Text style={styles.highlight}>Conclua</Text>
            {' as atividades e '}
            <Text style={styles.highlight}>avance</Text>
            {' para o próximo dia'}
          </Text>

          <Image
            source={{ uri: SEMANA.img }}
            style={{ width: horizontalScale(290), height: verticalScale(290) }}
            resizeMode="cover"
          />
        </View>

        {DIA.exercicio !== '' ? (
          statusDiaAtual.exercicioConcluido
            ? renderCompletedButton()
            : (
              <ImgButton
                title={buttonText()}
                onPress={() => setCurrentScreen(DIA.exercicio)}
                img={
                  DIA.exercicio === 'PERGUNTAS'
                    ? ([5, 6, 7, 8].includes(semanaAtual)
                      ? 'ExpSombra'
                      : 'ExpLuz')
                    : DIA.exercicio
                }
              />
            )
        ) : (
          <View style={styles.spacer} />
        )}

        {statusDiaAtual.meditacaoLiberada ? (
          statusDiaAtual.meditacaoConcluida
            ? renderCompletedButton()
            : (
              <ImgButton
                title="Meditação"
                onPress={() => setCurrentScreen('MEDITACAO')}
                img="ExpMeditacoes"
              />
            )
        ) : (
          <ImgButton title="Bloqueado" img="ExpBlock" />
        )}

        <ButtonPrimary
          title={concluindoDia ? 'Concluindo...' : 'Concluir o dia'}
          onPress={handleConcluirDia}
          disabled={!diaCompleto || concluindoDia}
          height={40}
        />
      </View>

      {showParabens && (
        <View style={overlay.parabensOverlay}>
          <Text style={overlay.parabensTitle}>🎉 Parabéns!</Text>
          <Text style={overlay.parabensText}>
            Você concluiu mais um dia da sua jornada
          </Text>
        </View>
      )}

      {showConfetti && (
        <ConfettiCannon
          count={20}
          fadeOut
          origin={{ x: 200, y: 0 }}
          explosionSpeed={100}
          fallSpeed={1300}
          autoStart
        />
      )}
    </View>
  );
}

const overlay = StyleSheet.create({
  parabensOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  parabensTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  parabensText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
