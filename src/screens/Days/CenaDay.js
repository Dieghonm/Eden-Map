import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext, useApp } from '../../context/AppProvider';
import { DESCRICAOCENA } from '../../../assets/json/Semanas';
import GlassBox from '../../components/GlassBox';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import { spacing } from '../../theme/texts';

export default function CenaDay({ onComplete }) {
  const { 
    selectedPath, 
    semanaAtual,
    salvarCenasRespostas,
    marcarExercicioConcluido
  } = useApp();
  
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const data = DESCRICAOCENA[pathKey]?.[semanaAtual - 1];

  const [currentCena, setCurrentCena] = useState(1);
  const [respostas, setRespostas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [onde, setOnde] = useState('');
  const [quem, setQuem] = useState('');
  const [acao, setAcao] = useState('');

  const totalCenas = data ? Object.keys(data).filter(key => key.startsWith('Cena')).length : 0;
  const cenaKey = `Cena ${currentCena}`;
  const textoCena = data?.[cenaKey] || 'Cena não encontrada';

  const isFormValid = onde.trim() !== '' && quem.trim() !== '' && acao.trim() !== '';

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
      const sucesso = await salvarRespostas(respostasAtualizadas);
      
      if (sucesso && onComplete) {
        onComplete(true);
      }
    }
  };

  const limparCampos = () => {
    setOnde('');
    setQuem('');
    setAcao('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View >
            <Text >
              Cena {currentCena}/{totalCenas}
            </Text>
          </View>
          <GlassBox>
            <Text >
              {textoCena}
            </Text>
            <Text >
              Onde se passa sua cena?
            </Text>
            <TextInput
              placeholder="Ex: Na escola, no parque..."
              value={onde}
              onChangeText={setOnde}
            />
            <Text >
              Quem estava ao seu redor?
            </Text>
            <TextInput
              placeholder="Ex: Colegas de classe, família..."
              value={quem}
              onChangeText={setQuem}
            />

            <Text >
              Qual era o contexto ou ação?
            </Text>
            <TextInput
              placeholder="Ex: Foi o dia em que..."
              value={acao}
              onChangeText={setAcao}
            />
          </GlassBox>

          <View >
            <ButtonPrimary
              title={isLoading ? 'Salvando...' : (currentCena >= totalCenas ? 'Concluir' : 'Próxima cena')}
              onPress={handleNext}
              disabled={!isFormValid || isLoading}
              height={40}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}