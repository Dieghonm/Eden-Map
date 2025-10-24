import React from 'react';
import { Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/Logo';

export default function Logo({ width = 53, height = 35 }) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  return (
    <Image 
      source={require('../../assets/Logo.png')} 
      style={styles.logo}
      resizeMode="contain"
    />
  );
}