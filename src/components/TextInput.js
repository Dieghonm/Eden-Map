import React, { useState } from 'react';
import { View, TextInput as RNTextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/TextInput';


export default function TextInput({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  showPasswordToggle = false,
  disabled = false 
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container }>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
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