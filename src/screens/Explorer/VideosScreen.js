import React, { useState } from 'react';
import { Text, ScrollView, View } from 'react-native';


import { useTheme } from '../../context/ThemeProvider';
import { VIDEOS } from '../../../assets/json/Semanas';

import GlassBox from '../../components/GlassBox';
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

  return (
    <View style={styles.container} >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassBox>

          <Text style={styles.videoTitle}>{currentVideo.topico}</Text>
          <Text style={styles.videoDescription}>
            {currentVideo.sinopse[0]}
            <Text style={styles.highlight}>{currentVideo.sinopse[1]}</Text>
            {currentVideo.sinopse[2]}
            <Text style={styles.highlight}>{currentVideo.sinopse[3]}</Text>
            {currentVideo.sinopse[4]}
          </Text>
          <Text style={styles.videoDuration}>Duração: 5 minutos</Text>

          <View style={styles.linha}/>
          <View>

            <VideoPlayer
              key={currentVideo.video}
              videoId={currentVideo.video}
            />
          </View>
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
    </View>
  );
}