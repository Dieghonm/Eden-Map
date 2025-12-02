import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Image, View, Text, Animated, Platform } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/PlayButton';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PlayButton({ text = 'Áudio', source, duration = 150 }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const player = useAudioPlayer(
    typeof source === 'string' ? { uri: source } : source
  );

  const borderColor = theme?.button || '#0A84FF';
  const borderBase = theme?.terciario || '#797979';

  const radius = 26;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const centerX = radius + strokeWidth / 2;
  const centerY = radius + strokeWidth / 2;

  const startAnimation = () => {
    progress.setValue(0);
    
    Animated.timing(progress, {
      toValue: 1,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIsPlaying(false);
        progress.setValue(0);
      }
    });
  };

  const stopAnimation = () => {
    progress.stopAnimation();
    progress.setValue(0);
  };

  const handlePress = async () => {
    try {
      if (!isPlaying) {
        await player.play();
        setIsPlaying(true);
        startAnimation();
      } else {
        await player.pause();
        setIsPlaying(false);
        stopAnimation();
      }
    } catch (error) {
      console.log('Erro no player:', error);
    }
  };

  useEffect(() => {
    return () => {
      try {
        progress.stopAnimation();
        player.pause();
      } catch (error) {
        console.log('Cleanup error:', error);
      }
    };
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const svgProps = Platform.OS === 'web' ? {} : { collapsable: false };

  const circleRotationProps = Platform.OS === 'web'
    ? {
        rotation: "-90",
        style: { transformOrigin: 'center' }
      }
    : {
        rotation: "-90",
        originX: centerX,
        originY: centerY
      };

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
          {...svgProps}
        >
          {/* Círculo base */}
          <Circle
            stroke={borderBase}
            fill="none"
            cx={centerX}
            cy={centerY}
            r={radius}
            strokeWidth={strokeWidth}
            opacity={0.3}
          />

          {/* Círculo animado */}
          <AnimatedCircle
            stroke={borderColor}
            fill="none"
            cx={centerX}
            cy={centerY}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            {...circleRotationProps}
          />
        </Svg>

        <Image
          source={
            isPlaying
              ? require('../../assets/icons/Pause.png')
              : require('../../assets/icons/Play.png')
          }
          style={styles.playIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
