import React from 'react';
import { Image, View, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/PlayButton';

export default function PlayButton({ width = 50, height = 50, status = true, text }) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  const logoSource = status
    ? require('../../assets/Play.png')
    : require('../../assets/Pause.png');

  return (
    <View style={styles.playBox}>
      <Text>{text}</Text>
      <Image
        source={logoSource}
        style={styles.PlayButton}
        resizeMode="contain"
      />
    </View>

  );
}
