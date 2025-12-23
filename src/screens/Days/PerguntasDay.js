import { useState } from 'react';
import { View, Platform, Text, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Days/PerguntasDay';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { PERGUNTAS } from '../../../assets/json/Semanas';
import { spacing } from '../../theme/texts';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function PerguntasDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const { selectedPath, semanaAtual } = useApp();
  const { salvarPerguntaResposta } = useJourney();
  
  const [resposta, setResposta] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const data = PERGUNTAS[selectedPath][semanaAtual - 1];

  const handleConcluir = async () => {
    if (!resposta.trim()) return;
    setIsLoading(true);
    
    const sucesso = await salvarPerguntaResposta(semanaAtual, selectedPath, resposta);
    
    setIsLoading(false);
    
    if (__DEV__) {
      console.log('✅ Pergunta salva:', {
        semana: semanaAtual,
        path: selectedPath,
        resposta: resposta.substring(0, 50) + '...',
        sucesso
      });
    }
    
    if (sucesso && onComplete) {
      onComplete(true);
    }
  };

  return (
    <View >
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xxxl / 2}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.perguntaTexto}>{data.Pergunta}</Text>
          <GlassBox>
            <Text style={styles.labelResposta}>Reflita sobre e responda.</Text>
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
            disabled={!resposta.trim() || isLoading} 
            onPress={handleConcluir}
            height={40}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}
