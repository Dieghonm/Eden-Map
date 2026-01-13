import React, { useState, useMemo } from 'react';
import { View, TextInput as RNTextInput, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/TextInput';

export default function TextInput({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  showPasswordToggle = false,
  disabled = false,
  isValid = true,
  showValidation = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences'
}) {
  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ✅ CORREÇÃO: Criar styles dinamicamente baseado em isValid e showValidation
  const styles = useMemo(() => 
    createStyles(theme, isValid, showValidation), 
    [theme, isValid, showValidation]
  );

  return (
    <View style={[
      styles.container,
      // ✅ APLICAR ESTILO DE VALIDAÇÃO APENAS SE showValidation === true
      showValidation && (isValid ? styles.containerValid : styles.containerInvalid)
    ]}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.fontColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        editable={!disabled}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

      {showPasswordToggle && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          activeOpacity={0.7}
        >
          {isPasswordVisible
            ? <Image source={require('../../assets/icons/Eye.png')} />
            : <Image source={require('../../assets/icons/EyeSlash.png')} />
          }
        </TouchableOpacity>
      )}
    </View>
  );
}