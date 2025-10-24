import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/WelcomeText';

export default function WelcomeText({ title, subtitle }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}