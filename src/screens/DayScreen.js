import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

export default function DayScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { semanaAtual, diaAtual, avancarDia } = useApp();

  const SEMANA = SEMANAS[semanaAtual - 1];
  const DIA = CALENDAR[diaAtual - 1];

  const [currentScreen, setCurrentScreen] = useState('');
  const [entradaScreen, setEntradaScreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const initialStatus = {
    exercicioConcluido: DIA.exercicio === '',
    meditacaoLiberada: DIA.exercicio === '',
    meditacaoConcluida: false,
  };

  const [statusDiaAtual, setStatusDiaAtual] = useState(initialStatus);

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

  const handleExercicioComplete = (sucesso) => {
    if (!sucesso) return;

    setCurrentScreen('');
    setStatusDiaAtual(prev => ({
      ...prev,
      exercicioConcluido: true,
      meditacaoLiberada: true,
    }));
  };

  const handleMeditacaoComplete = (sucesso) => {
    if (!sucesso) return;

    setCurrentScreen('');
    setStatusDiaAtual(prev => ({
      ...prev,
      meditacaoConcluida: true,
    }));
  };

  const handleConcluirDia = async () => {
    setShowConfetti(true);

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
    }, 1300);
  };

  const diaCompleto =
    statusDiaAtual.exercicioConcluido &&
    statusDiaAtual.meditacaoConcluida;

  const renderCompletedButton = () => (
    <ImgButton title="Finalizado" img="Checked" onPress={() => {}} />
  );

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
    return (
      <SafeAreaView style={styles.container}>

        <ButtonPrimary
          title="Exercícios do dia"
          onPress={() => setEntradaScreen(true)}
        />
        <ButtonSecundary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
          style={{
            width: horizontalScale(290),
            height: verticalScale(290),
          }}
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
        title="Concluir o dia"
        onPress={handleConcluirDia}
        disabled={!diaCompleto}
        height={40}
      />

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
    </SafeAreaView>
  );
}
