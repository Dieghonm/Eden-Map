import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Desire';
import { storeData } from '../../utils/storage';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { spacing } from '../../theme/texts';

export default function Desire({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [desireName, setDesireName] = useState('');
  const [desireDescription, setDesireDescription] = useState('');

  const caracter = 15

  const isFormValid = 
    desireName.trim().length > 0 && 
    desireName.trim().length <= caracter &&
    desireDescription.trim().length > 0;

  const handleNext = async () => {
    if (!isFormValid) return;
    try {
      await storeData('desireName', desireName.trim());
      await storeData('desireDescription', desireDescription.trim());
      onNext();
    } catch (error) {
      console.error('❌ Erro ao salvar desejo:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xl}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <GlassBox>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Qual o nome do seu desejo?</Text>
            <RNTextInput
              style={styles.input}
              placeholder='Máximo de 15 caracteres'
              placeholderTextColor={theme.fontColor}
              value={desireName}
              onChangeText={setDesireName}
              maxLength={caracter}
            />
          </View>
        </GlassBox>
        <GlassBox>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descreva o desejo material.</Text>
            <RNTextInput
              style={[styles.input, styles.textArea]}
              placeholder='Máximo de 300 caracteres'
              placeholderTextColor={theme.fontColor}
              value={desireDescription}
              onChangeText={setDesireDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={300}
            />
          </View>
        </GlassBox>
        <Text style={styles.helperText}>
          Para avançar preencha as boxes acima
        </Text>

        <ButtonPrimary
          title='Próximo passo'
          onPress={handleNext}
          disabled={!isFormValid}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}