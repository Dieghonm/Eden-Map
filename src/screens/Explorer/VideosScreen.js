// src/screens/Explorer/VideosScreen.js - REFATORADO
import React, { useState } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../context/ThemeProvider';
import { VIDEOS } from '../../../assets/json/Semanas';

import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import VideoPlayer from '../../components/VideoPlayer';
import NavigationControls from '../../components/NavigationControls';

import { createStyles } from '../../styles/Explorer/VideosScreen';

export default function VideosScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentVideo = VIDEOS[currentVideoIndex];
  const totalVideos = VIDEOS.length;

  const handleNext = () => {
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  const openYoutube = () => {
    const url = `https://www.youtube.com/watch?v=${currentVideo.video}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.videoDescription}>
          {currentVideo.sinopse[0]}
          <Text style={styles.highlight}>{currentVideo.sinopse[1]}</Text>
          {currentVideo.sinopse[2]}
          <Text style={styles.highlight}>{currentVideo.sinopse[3]}</Text>
          {currentVideo.sinopse[4]}
        </Text>

        <GlassBox>
          <Text style={styles.videoTitle}>{currentVideo.topico}</Text>
          <VideoPlayer
            key={currentVideo.video}
            videoId={currentVideo.video}
            height={220}
          />
          <Text style={styles.videoDuration}>Duração: 5 minutos</Text>
          <ButtonPrimary
            title="Assistir no YouTube"
            onPress={openYoutube}
            width={220}
          />
        </GlassBox>

        <NavigationControls
          currentIndex={currentVideoIndex}
          total={totalVideos}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <ButtonSecundary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}