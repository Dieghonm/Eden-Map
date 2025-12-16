// src/components/GlassBox.js - CORRIGIDO
import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/GlassBox';

export default function GlassBox({ children, style, disabled = false }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const containerStyle = [
    styles.container, 
    disabled && styles.containerDisabled,
    disabled && { pointerEvents: 'none' },
    style
  ];

  return (
    <View style={containerStyle}>
      <LinearGradient
        colors={theme.glassGradient}
        start={{ x: 0.7, y: 0.3 }}
        end={{ x: 0.2, y: 1}}
        style={styles.glassGradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
}