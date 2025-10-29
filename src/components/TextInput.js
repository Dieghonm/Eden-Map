import React, { useState } from 'react';
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
  const styles = createStyles(theme, isValid, showValidation);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, showValidation && !isValid && styles.containerInvalid]}>
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
          {isPasswordVisible ? 
            <Image source={require('../../assets/icons/Eye.png')} />
            : <Image source={require('../../assets/icons/EyeSlash.png')} />}
        </TouchableOpacity>
      )}
    </View>
  );
}