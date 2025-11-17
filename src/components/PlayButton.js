import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Image, View, Text, Animated } from 'react-native';
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
  const animationRef = useRef(null);
  
  // Cria o player de áudio
  const player = useAudioPlayer(source);

  const borderColor = theme?.button || '#0A84FF';
  const borderBase = theme?.terciario || '#797979';

  const radius = 26;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  // Monitora o status do player
  useEffect(() => {
    const subscription = player.addListener('playingStatusDidChange', (status) => {
      if (status.playing) {
        setIsPlaying(true);
        
        // Para qualquer animação anterior
        if (animationRef.current) {
          animationRef.current.stop();
        }
        
        // Inicia a animação de progresso
        animationRef.current = Animated.timing(progress, {
          toValue: 1,
          duration: duration * 1000,
          useNativeDriver: true,
        });
        
        animationRef.current.start();
        
      } else {
        setIsPlaying(false);
        
        // Se chegou ao fim, reseta o progresso
        if (status.didJustFinish) {
          progress.setValue(0);
          if (animationRef.current) {
            animationRef.current.stop();
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, duration, progress]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      // Para a animação
      if (animationRef.current) {
        animationRef.current.stop();
      }
      
      // Remove o player
      if (player) {
        player.remove();
      }
    };
  }, [player]);

  const handlePress = () => {
    if (!isPlaying) {
      player.play();
    } else {
      player.pause();
      
      // Para a animação e reseta o progresso
      if (animationRef.current) {
        animationRef.current.stop();
      }
      progress.setValue(0);
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