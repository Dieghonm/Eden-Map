import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import YoutubeIframe from "react-native-youtube-iframe";  // 👉 IMPORTANTE

import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { createStyles } from '../../styles/Explorer/VideosScreen';
import { useTheme } from '../../context/ThemeProvider';
import { VIDEOS } from '../../../assets/json/Semanas';

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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassBox style={styles.videoCard}>
          
          <Text style={styles.videoTitle}>{currentVideo.topico}</Text>
          <Text style={styles.videoDescription}>{currentVideo.sinopse}</Text>
          <Text style={styles.videoDuration}>Duração: 5 minutos</Text>

          {/* 🎥 PLAYER DO YOUTUBE */}
          <YoutubeIframe
            height={220}
            play={false}
            videoId={currentVideo.video}
          />

          <ButtonPrimary
            title="Assistir agora"
            onPress={() => console.log('▶️ Reproduzindo:', currentVideo.video)}
            width={220}
          />
        </GlassBox>

        {/* Navegação entre semanas */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handlePrevious}
            disabled={currentVideoIndex === 0}
          >
            <Text style={[
              styles.navIcon,
              currentVideoIndex === 0 && styles.navIconDisabled
            ]}>◀</Text>
          </TouchableOpacity>

          <Text style={styles.counter}>
            {currentVideoIndex + 1}/{totalVideos}
          </Text>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleNext}
            disabled={currentVideoIndex === totalVideos - 1}
          >
            <Text style={[
              styles.navIcon,
              currentVideoIndex === totalVideos - 1 && styles.navIconDisabled
            ]}>▶</Text>
          </TouchableOpacity>
        </View>

        <ButtonPrimary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
