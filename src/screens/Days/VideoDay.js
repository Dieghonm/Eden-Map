import React, { useState } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { VIDEOS } from '../../../assets/json/Semanas';
import { createStyles } from '../../styles/Days/VideoDay';
import GlassBox from '../../components/GlassBox';
import VideoPlayer from '../../components/VideoPlayer';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';

export default function VideoDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  const { salvarVideoAssistido } = useJourney();

  const [videoCompleto, setVideoCompleto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const videoData = VIDEOS[semanaAtual - 1];

  const handleVideoStateChange = (state) => {
    if (state === 'ended') {
      setVideoCompleto(true);
    }
  };

  const openYoutube = () => {
    const url = `https://www.youtube.com/watch?v=${videoData.video}`;
    Linking.openURL(url);
  };

  const handleConcluir = async () => {
    setIsLoading(true);
    const sucesso = await salvarVideoAssistido(semanaAtual, selectedPath, {
      videoId: videoData.id,
      topico: videoData.topico,
      assistidoEm: new Date().toISOString()
    });
    setIsLoading(false);

    if (sucesso && onComplete) {
      onComplete(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sinopse}>Sinopse do vídeo: </Text>

        <Text style={styles.videoDescription}>
          {videoData.sinopse[0]}
          <Text style={styles.highlight}>{videoData.sinopse[1]}</Text>
          {videoData.sinopse[2]}
          <Text style={styles.highlight}>{videoData.sinopse[3]}</Text>
          {videoData.sinopse[4]}
        </Text>
        <Text style={styles.videoDuration}>Duração: 5 minutos</Text>
        <View  style={styles.spacer}/>
        <GlassBox style={styles.videoCard}>
          <Text style={styles.videoTitle}>{videoData.topico}</Text>
          <VideoPlayer
            videoId={videoData.video}
            height={200}
            play
            onChangeState={handleVideoStateChange}
          />

          <ButtonPrimary
            title="Assistir no Youtube"
            onPress={openYoutube}
            width={220}
          />
        </GlassBox>

        <ButtonSecundary
          title={isLoading ? "Salvando..." : "Concluir"}
          onPress={handleConcluir}
          height={40}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
