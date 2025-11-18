import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubeIframe from "react-native-youtube-iframe";

import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { createStyles } from '../../styles/Explorer/VideosScreen';
import { useTheme } from '../../context/ThemeProvider';
import { VIDEOS } from '../../../assets/json/Semanas';
import VideoPlayer from '../../components/VideoPlayer';
import ButtonSecundary from '../../components/ButtonSecundary';

export default function VideosScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = VIDEOS[currentVideoIndex];
  const totalVideos = VIDEOS.length;

  const handleNext = () => {
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      setIsPlaying(false);
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
          <Text style={styles.videoDescription}>
            {currentVideo.sinopse[0]}
            <Text style={styles.highlight}>{currentVideo.sinopse[1]}</Text>
            {currentVideo.sinopse[2]}
            <Text style={styles.highlight}>{currentVideo.sinopse[3]}</Text>
            {currentVideo.sinopse[4]}
          </Text>
          <VideoPlayer
            videoId={currentVideo.video}
            height={220}
            play={isPlaying}
            onChangeState={state => {
              if (state === 'ended') setIsPlaying(false);
            }}
          />
          <Text style={styles.videoDuration}>Duração: 5 minutos</Text>
          <ButtonPrimary
            title="Assistir agora"
            onPress={() => setIsPlaying(true)}
            width={220}
          />
        </GlassBox>

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

        <ButtonSecundary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
