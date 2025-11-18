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
  showValidation = false
}) {
  const { theme } = useTheme();

  // ⛔ Antes: recarregava estilos e recriava componentes
  // const styles = createStyles(theme, isValid, showValidation);

  // ✅ Agora: estilos são memorizados e NÃO dependem da validação
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // A validação controla SOMENTE a borda
  const finalContainerStyle = [
    styles.container,
    showValidation && !isValid && { borderColor: theme.error }
  ];

  return (
    <View style={finalContainerStyle}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.fontColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        editable={!disabled}
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
