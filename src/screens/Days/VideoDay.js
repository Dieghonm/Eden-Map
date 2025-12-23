import React, { useState } from 'react';
import { View, Text, ScrollView} from 'react-native';

import { useTheme } from '../../context/ThemeProvider';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { VIDEOS } from '../../../assets/json/Semanas';
import { createStyles } from '../../styles/Days/VideoDay';
import GlassBox from '../../components/GlassBox';
import VideoPlayer from '../../components/VideoPlayer';
import ButtonSecundary from '../../components/ButtonSecundary';
import HeaderAjuster from '../../components/HeaderAjuster';

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
    <View style={styles.container} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderAjuster />
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
          <View>
            <VideoPlayer
              videoId={videoData.video}
              play
              onChangeState={handleVideoStateChange}
            />
          </View>
        </GlassBox>

        <ButtonSecundary
          title={isLoading ? "Salvando..." : "Concluir"}
          onPress={handleConcluir}
          height={40}
        />
      </ScrollView>
    </View>
  );
}
