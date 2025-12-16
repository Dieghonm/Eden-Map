import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ButtonSecundary';

export default function ButtonSecundary({ 
  title, 
  onPress, 
  disabled,
  width = 290,
  height = 45 
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  const buttonStyle = [
    styles.button, 
    disabled && styles.buttonDisabled,
    disabled && { pointerEvents: 'none' }
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}