import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Platform } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { PERGUNTAS } from '../../../assets/json/Semanas';
import { createStyles } from '../../styles/Days/PerguntasDay';
import { spacing } from '../../theme/texts';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function PerguntasDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual, diaAtual } = useApp();
  const { salvarPerguntaResposta } = useJourney();

  const [resposta, setResposta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Busca pergunta da semana atual
  const pathKey = selectedPath === 'Atenção Plena' ? 'AtencaoPlena' : selectedPath;
  const perguntaData = PERGUNTAS[pathKey]?.[semanaAtual - 1];

  if (!perguntaData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Pergunta não encontrada</Text>
      </SafeAreaView>
    );
  }

  const isFormValid = resposta.trim().length > 0;

  const handleConcluir = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    const sucesso = await salvarPerguntaResposta(
      semanaAtual,
      selectedPath,
      {
        tipo: perguntaData.Tipo,
        pergunta: perguntaData.Pergunta,
        resposta: resposta.trim(),
        diaAtual: diaAtual
      }
    );
    
    setIsLoading(false);
    if (sucesso && onComplete) {
      onComplete(true);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xxxl / 2}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              Pergunta: <Text style={styles.highlight}>{perguntaData.Tipo}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Reflita profundamente e responda com sinceridade
            </Text>
          </View>

          <GlassBox style={styles.perguntaCard}>
            <Text style={styles.perguntaTexto}>{perguntaData.Pergunta}</Text>
          </GlassBox>

          <GlassBox style={styles.respostaCard}>
            <Text style={styles.labelResposta}>Sua resposta:</Text>
            <TextInput
              style={styles.input}
              placeholder="Escreva sua reflexão aqui..."
              placeholderTextColor={theme.fontColor}
              value={resposta}
              onChangeText={setResposta}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
            <Text style={styles.helperText}>
              Não há respostas certas ou erradas. Seja honesto consigo mesmo.
            </Text>
          </GlassBox>

          <ButtonPrimary
            title={isLoading ? "Salvando..." : "Concluir"}
            onPress={handleConcluir}
            disabled={!isFormValid || isLoading}
            height={40}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}