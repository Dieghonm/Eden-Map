import React, { useRef, useEffect } from 'react';
import { Animated, View, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/Img';

export default function Img({ source, size = 120 }) {
  const { theme } = useTheme();
  const styles = createStyles(theme, size);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true })
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.borderGlow,
          { transform: [{ scale }] }
        ]}
      />
      <Image 
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}
