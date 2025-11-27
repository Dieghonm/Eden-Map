import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { useApp } from '../context/AppProvider';
import { createStyles } from '../styles/DayScreen';
import { SEMANAS, CALENDAR } from '../../assets/json/Semanas';
import ImgButton from '../components/ImgButton';
import ButtonPrimary from '../components/ButtonPrimary';
import { horizontalScale, verticalScale } from '../utils/responsive';
import CenaDay from './Days/CenaDay';
import VideoDay from './Days/VideoDay';
import MissaoDay from './Days/MissaoDay';
import TrakingDay from './Days/TrakingDay';
import PerguntasDay from './Days/PerguntasDay';
import MeditacaoScreen from './Days/MeditacaoScreen';

export default function DayScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { 
    semanaAtual,
    diaAtual,
    selectedPath,
    statusDias,
    carregarStatusDia,
    marcarMeditacaoConcluida,
    avancarDia,
  } = useApp();
  
  const SEMANA = SEMANAS[semanaAtual - 1];
  const DIA = CALENDAR[diaAtual - 1];
  
  const [currentScreen, setCurrentScreen] = useState('');
  
  // Busca o status do dia atual
  const statusDiaAtual = statusDias?.[`${semanaAtual}_${diaAtual}`] || {
    exercicioConcluido: false,
    meditacaoLiberada: false,
    meditacaoConcluida: false,
  };

  useEffect(() => {
    // Carrega o status ao montar
    carregarStatusDia(semanaAtual, diaAtual);
  }, [semanaAtual, diaAtual]);

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
        return [5, 6, 7, 8].includes(diaAtual) ? 'Pergunta: Sombra' : 'Pergunta: Luz';
      default:
        return '';
    }
  };

  const handleExercicioComplete = (sucesso) => {
    if (sucesso) {
      // O AppProvider já marcou como concluído
      setCurrentScreen('');
    }
  };

  const handleMeditacaoComplete = async (sucesso) => {
    if (sucesso) {
      await marcarMeditacaoConcluida(semanaAtual, diaAtual);
      setCurrentScreen('');
    }
  };

  const handleConcluirDia = async () => {
    const resultado = await avancarDia();
    if (resultado.sucesso) {
      console.log('✅', resultado.message);
    } else {
      console.log('🎉', resultado.message);
    }
  };

  // Verifica se o dia está completo
  const diaCompleto = statusDiaAtual.exercicioConcluido && statusDiaAtual.meditacaoConcluida;

  // Renderiza as telas dos exercícios
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

  // Tela principal do dia
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
            height: verticalScale(290) 
          }}
        />
      </View>

      {/* Botão do Exercício Principal */}
      {DIA.exercicio !== '' ? (
        <ImgButton 
          title={statusDiaAtual.exercicioConcluido ? `✓ ${buttonText()}` : buttonText()}
          onPress={() => setCurrentScreen(DIA.exercicio)}
          img={DIA.exercicio === 'PERGUNTAS' 
            ? ([5, 6, 7, 8].includes(diaAtual) ? 'ExpSombra' : 'ExpLuz')
            : DIA.exercicio
          }
        />
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Botão da Meditação */}
      {statusDiaAtual.meditacaoLiberada ? (
        <ImgButton 
          title={statusDiaAtual.meditacaoConcluida ? "✓ Meditação" : "Meditação"}
          onPress={() => setCurrentScreen('MEDITACAO')}
          img="ExpMeditacoes"
        />
      ) : (
        <ImgButton 
          title="Bloqueado"
          onPress={() => console.log('Meditação bloqueada')}
          img="ExpBlock"
        />
      )}

      {/* Botão de Concluir Dia */}
      <ButtonPrimary 
        title="Concluir o dia"
        onPress={handleConcluirDia}
        disabled={!diaCompleto}
        height={40}
      />

      {/* Indicador de Progresso */}
      {statusDiaAtual.exercicioConcluido && !statusDiaAtual.meditacaoLiberada && (
        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          ⏳ Complete o exercício para liberar a meditação
        </Text>
      )}
      
      {diaCompleto && (
        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: theme.success }}>
          ✓ Todas as atividades concluídas!
        </Text>
      )}
    </SafeAreaView>
  );
}
