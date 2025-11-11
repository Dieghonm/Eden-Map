import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Image, View, Text, Animated } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/PlayButton';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PlayButton({ text = 'Áudio', source, duration = 150 }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const progress = useRef(new Animated.Value(0)).current;

  const borderColor = theme?.button || '#0A84FF';
  const borderBase = theme?.terciario || '#797979';

  const radius = 26;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const handlePress = async () => {
    if (!isPlaying) {
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: duration * 1000,
        useNativeDriver: true,
      }).start();
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          progress.setValue(0);
        }
      });
    } else {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
        progress.setValue(0);
      }
    }
  };

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <TouchableOpacity 
      style={styles.playBox} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconWrapper}>
        <Svg
          height={radius * 2 + strokeWidth}
          width={radius * 2 + strokeWidth}
          style={styles.svgWrapper}
        >
          <Circle
            stroke={borderBase}
            fill="none"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          <AnimatedCircle
            stroke={borderColor}
            fill="none"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <Image
          source={
            isPlaying
              ? require('../../assets/Pause.png')
              : require('../../assets/Play.png')
          }
          style={styles.playIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
