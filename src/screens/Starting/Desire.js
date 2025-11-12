import React, { useState, useContext } from 'react';
import { View, Text, TextInput as RNTextInput, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Desire';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { spacing } from '../../theme/texts';

export default function Desire({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const { 
    desireName: savedName,
    desireDescription: savedDescription,
    setDesireName,
    setDesireDescription 
  } = useContext(AppContext);

  const [localName, setLocalName] = useState(savedName || '');
  const [localDescription, setLocalDescription] = useState(savedDescription || '');

  const maxChars = 15;

  const isFormValid = 
    localName.trim().length > 0 && 
    localName.trim().length <= maxChars &&
    localDescription.trim().length > 0;

  const handleNext = async () => {
    if (!isFormValid) return;
    await setDesireName(localName);
    await setDesireDescription(localDescription);
    
    onNext();
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
              value={localName}
              onChangeText={setLocalName}
              maxLength={maxChars}
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
              value={localDescription}
              onChangeText={setLocalDescription}
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