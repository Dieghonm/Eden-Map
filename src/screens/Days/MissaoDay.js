// src/screens/Days/MissaoDay.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { SEMANAS, MISSAO } from '../../../assets/json/Semanas';
import { createStyles } from '../../styles/Days/MissaoDay';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';

export default function MissaoDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  const { salvarMissaoConcluida } = useJourney();

  // Estados
  const [etapaAtual, setEtapaAtual] = useState('APRESENTACAO'); // APRESENTACAO, INSIGHT, CONCLUSAO
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [missaoConcluida, setMissaoConcluida] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Busca dados da missão
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const missaoData = MISSAO[pathKey]?.[semanaAtual - 1];
  const semanaData = SEMANAS[semanaAtual - 1];

  if (!missaoData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Missão não encontrada</Text>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // FUNÇÕES DE CONTROLE
  // ============================================================================

  const iniciarMissao = () => {
    setEtapaAtual('INSIGHT');
    // Inicia o cronômetro
    const id = setInterval(() => {
      setTempoDecorrido(prev => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const voltarParaApresentacao = () => {
    // Para o cronômetro se estiver rodando
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTempoDecorrido(0);
    setEtapaAtual('APRESENTACAO');
  };

  const concluirMissao = () => {
    // Para o cronômetro
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setMissaoConcluida(true);
    setEtapaAtual('CONCLUSAO');
  };

  const falharMissao = () => {
    // Para o cronômetro
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setMissaoConcluida(false);
    setEtapaAtual('CONCLUSAO');
  };

  const finalizarEEnviar = async () => {
    setIsLoading(true);
    
    const sucesso = await salvarMissaoConcluida(
      semanaAtual,
      selectedPath,
      {
        titulo: missaoData.Titulo,
        missao: missaoData.Missão,
        estrelas: missaoData.estrelas,
        concluida: missaoConcluida,
        tempoDecorrido,
        feedback: feedback.trim()
      }
    );
    
    setIsLoading(false);
    
    if (sucesso && onComplete) {
      onComplete(true);
    }
  };

  // ============================================================================
  // FORMATAÇÃO DE TEMPO
  // ============================================================================

  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  // ============================================================================
  // RENDERIZAÇÃO DAS ETAPAS
  // ============================================================================

  const renderEstrelas = (quantidade) => {
    const estrelas = [];
    for (let i = 0; i < 5; i++) {
      estrelas.push(
        <Text key={i} style={styles.estrela}>
          {i < quantidade ? '⭐' : '☆'}
        </Text>
      );
    }
    return <View style={styles.estrelasContainer}>{estrelas}</View>;
  };

  const renderApresentacao = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image 
        source={{ uri: semanaData.img }} 
        style={styles.semanaImage}
        resizeMode="cover"
      />

      <GlassBox style={styles.card}>
        {renderEstrelas(missaoData.estrelas)}
        
        <Text style={styles.titulo}>{missaoData.Titulo}</Text>

        <View style={styles.missaoBox}>
          <Text style={styles.missaoLabel}>Desligar para conectar</Text>
          <Text style={styles.missaoTexto}>{missaoData.Missão}</Text>
        </View>

        <Text style={styles.instrucao}>
          Durante essa semana, <Text style={styles.highlight}>mantenha-se afastado das redes sociais</Text> e observe como sua mente reage ao silêncio e à presença.
        </Text>
      </GlassBox>

      <ButtonPrimary
        title="Iniciar missão"
        onPress={iniciarMissao}
        height={40}
      />
    </ScrollView>
  );

  const renderInsight = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cronometroContainer}>
        <Text style={styles.cronometro}>{formatarTempo(tempoDecorrido)}</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <GlassBox style={styles.card}>
        {renderEstrelas(missaoData.estrelas)}
        
        <Text style={styles.titulo}>{missaoData.Titulo}</Text>

        <View style={styles.missaoBox}>
          <Text style={styles.missaoTexto}>{missaoData.Missão}</Text>
        </View>

        <Text style={styles.instrucao}>
          Durante essa semana, <Text style={styles.highlight}>mantenha-se afastado das redes sociais</Text> e observe como sua mente reage ao silêncio e à presença.
        </Text>
      </GlassBox>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoConcluir]}
          onPress={concluirMissao}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../assets/icons/Checked.png')}
            style={styles.botaoIcon}
          />
          <Text style={styles.botaoTexto}>Conclui a missão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoFalhar]}
          onPress={falharMissao}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../assets/icons/ExpBlock.png')}
            style={styles.botaoIcon}
          />
          <Text style={styles.botaoTexto}>Falhei na missão</Text>
        </TouchableOpacity>
      </View>

      <ButtonSecundary
        title="Voltar"
        onPress={voltarParaApresentacao}
        height={40}
      />
    </ScrollView>
  );

  const renderConclusao = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image 
        source={{ uri: semanaData.img }} 
        style={styles.semanaImage}
        resizeMode="cover"
      />

      <GlassBox style={styles.card}>
        <Text style={styles.parabens}>
          {missaoConcluida ? 'Parabéns!' : 'Não desista!'}
        </Text>
        
        <Text style={styles.mensagemConclusao}>
          {missaoConcluida 
            ? 'Parabéns! Você desbloqueou o emblema da missão.'
            : 'Falhei na missão, mas continuarei tentando melhorar.'
          }
        </Text>

        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>
            Como foi sua experiência com a missão?
          </Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Máximo de x caracteres"
            placeholderTextColor={theme.fontColor}
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={300}
          />
        </View>
      </GlassBox>

      <ButtonPrimary
        title={isLoading ? "Salvando..." : "Próximo"}
        onPress={finalizarEEnviar}
        disabled={isLoading}
        height={40}
      />
    </ScrollView>
  );

  // ============================================================================
  // RENDERIZAÇÃO PRINCIPAL
  // ============================================================================

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {etapaAtual === 'APRESENTACAO' && renderApresentacao()}
      {etapaAtual === 'INSIGHT' && renderInsight()}
      {etapaAtual === 'CONCLUSAO' && renderConclusao()}
    </SafeAreaView>
  );
}