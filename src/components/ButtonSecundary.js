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

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
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