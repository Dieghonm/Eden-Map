import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ButtonPrimary';

export default function ButtonPrimary({ 
  title = '', 
  onPress, 
  disabled,
  width = 290,
  height = 45
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  return (
    <TouchableOpacity
      style={disabled && styles.buttonDisabled}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <LinearGradient
        colors={theme.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
