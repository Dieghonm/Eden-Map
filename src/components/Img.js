import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/Img';

export default function Img({ source, size = 120 }) {
  const { theme } = useTheme();
  const styles = createStyles(theme, size);

  return (
    <View style={styles.container}>
      <Image 
        source={source} 
        style={styles.image}
        resizeMode="cover"  // ← Como prop
      />
    </View>
  );
}