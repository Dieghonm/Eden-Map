import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ButtonSecundary';

export default function ButtonSecundary({ title, onPress, disabled }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={ disabled && styles.buttonDisabled}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>

    </TouchableOpacity>
  );
}
