import React, { useContext, useState } from 'react';
import { Text, View, ScrollView, Platform, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppContext, useApp } from '../../context/AppProvider';
import { DESCRICAOCENA } from '../../../assets/json/Semanas';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import { spacing } from '../../theme/texts';
import { useJourney } from '../../context/JourneyProvider';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Days/CenaDay';
import HeaderAjuster from '../../components/HeaderAjuster';

export default function CenaDay({ onComplete }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  const { salvarCenasRespostas } = useJourney();

  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const data = DESCRICAOCENA[pathKey]?.[semanaAtual - 1];

  const [currentCena, setCurrentCena] = useState(1);
  const [respostas, setRespostas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [onde, setOnde] = useState('');
  const [quem, setQuem] = useState('');
  const [acao, setAcao] = useState('');

  const totalCenas = data ? Object.keys(data).filter(k => k.startsWith('Cena')).length : 0;
  const cenaKey = `Cena ${currentCena}`;
  const textoCena = data?.[cenaKey] || '';

  const isFormValid = onde.trim() !== '' && quem.trim() !== '' && acao.trim() !== '';

  const limparCampos = () => {
    setOnde('');
    setQuem('');
    setAcao('');
  };

  const handleNext = async () => {
    const novaResposta = {
      cena: currentCena,
      pergunta: textoCena,
      onde: onde.trim(),
      quem: quem.trim(),
      acao: acao.trim()
    };

    const respostasAtualizadas = [...respostas, novaResposta];
    setRespostas(respostasAtualizadas);

    if (currentCena < totalCenas) {
      limparCampos();
      setCurrentCena(currentCena + 1);
    } else {
      setIsLoading(true);
      const sucesso = await salvarCenasRespostas(semanaAtual, selectedPath, respostasAtualizadas);
      setIsLoading(false);
      if (sucesso && onComplete) onComplete(true);
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
        <HeaderAjuster />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.cenaCount}>
            Cena <Text style={styles.highlight}>{currentCena}</Text>/{totalCenas}
          </Text>

          <GlassBox>
            <Text style={styles.cenaTitle}>{textoCena}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.cenaPart}>Onde se passa sua cena?</Text>
              <TextInput
                placeholder="Ex: Na escola, no parque..."
                value={onde}
                onChangeText={setOnde}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.cenaPart}>Quem estava ao seu redor?</Text>
              <TextInput
                placeholder="Ex: Colegas de classe, família..."
                value={quem}
                onChangeText={setQuem}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.cenaPart}>Qual era o contexto ou ação?</Text>
              <TextInput
                placeholder="Ex: Foi o dia em que, pela primeira vez, encontrei coragem de falar diante de todos e senti que minhas palavras ecoaram de verdade."
                value={acao}
                onChangeText={setAcao}
                style={[styles.input, styles.inputGrande]}
                multiline
              />
            </View>
          </GlassBox>

          <View>
            <ButtonPrimary
              title={
                isLoading
                  ? 'Salvando...'
                  : currentCena >= totalCenas
                  ? 'Concluir'
                  : 'Próxima cena'
              }
              onPress={handleNext}
              disabled={!isFormValid || isLoading}
              height={40}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}
