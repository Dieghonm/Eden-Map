import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { SEMANAS, TRACKING } from '../../../assets/json/Semanas';
import { createStyles } from '../../styles/Days/TrakingDay';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export default function TrakingDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual, diaAtual } = useApp();
  const { salvarTrackingResposta } = useJourney();

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Busca dados da semana e do tracking
  const semanaData = SEMANAS[semanaAtual - 1];
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao Plena' : selectedPath;
  const trackingData = TRACKING[pathKey]?.[semanaAtual - 1];

  if (!trackingData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Dados de tracking não encontrados</Text>
      </SafeAreaView>
    );
  }

  // Calcula os valores baseado no tipo (Luz ou Sombra)
  const calcularValor = (tipoResposta) => {
    const isLuz = trackingData.Tipo === 'Luz';
    
    if (tipoResposta === 'negativo') return isLuz ? -1 : 1;
    if (tipoResposta === 'neutro') return 0;
    if (tipoResposta === 'positivo') return isLuz ? 1 : -1;
    return 0;
  };

  const handleConcluir = async () => {
    if (!respostaSelecionada) return;

    setIsLoading(true);
    const valor = calcularValor(respostaSelecionada);
    
    const sucesso = await salvarTrackingResposta(
      semanaAtual,
      selectedPath,
      {
        tipo: trackingData.Tipo,
        pergunta: trackingData.texto,
        resposta: respostaSelecionada,
        valor: valor
      }
    );
    
    setIsLoading(false);
    if (sucesso && onComplete) {
      onComplete(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Reflexão: <Text style={styles.highlight}>{trackingData.Tipo}</Text>
          </Text>
          <Text style={styles.subtitle}>Como você se sente em relação a isso?</Text>
        </View>

        <Image 
          source={{ uri: semanaData.img }} 
          style={styles.semanaImage}
          resizeMode="cover"
        />

        <GlassBox style={styles.perguntaCard}>
          <Text style={styles.perguntaTexto}>{trackingData.texto}</Text>
        </GlassBox>

        <View style={styles.respostasContainer}>
          <TouchableOpacity
            style={[
              styles.respostaButton,
              styles.respostaNegativa,
              respostaSelecionada === 'negativo' && styles.respostaSelecionada
            ]}
            onPress={() => setRespostaSelecionada('negativo')}
            activeOpacity={0.7}
          >
            <Text style={styles.respostaEmoji}>😢</Text>
            <Text style={styles.respostaLabel}>Discordo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.respostaButton,
              styles.respostaNeutra,
              respostaSelecionada === 'neutro' && styles.respostaSelecionada
            ]}
            onPress={() => setRespostaSelecionada('neutro')}
            activeOpacity={0.7}
          >
            <Text style={styles.respostaEmoji}>😐</Text>
            <Text style={styles.respostaLabel}>Neutro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.respostaButton,
              styles.respostaPositiva,
              respostaSelecionada === 'positivo' && styles.respostaSelecionada
            ]}
            onPress={() => setRespostaSelecionada('positivo')}
            activeOpacity={0.7}
          >
            <Text style={styles.respostaEmoji}>😊</Text>
            <Text style={styles.respostaLabel}>Concordo</Text>
          </TouchableOpacity>
        </View>

        <ButtonPrimary
          title={isLoading ? "Salvando..." : "Concluir"}
          onPress={handleConcluir}
          disabled={!respostaSelecionada || isLoading}
          height={40}
        />
      </ScrollView>
    </SafeAreaView>
  );
}