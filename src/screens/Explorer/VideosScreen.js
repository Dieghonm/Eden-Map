import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { createStyles } from '../../styles/Explorer/VideosScreen';
import { useTheme } from '../../context/ThemeProvider';

export default function VideosScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Mock de vídeos
  const videos = [
    {
      id: 1,
      title: 'O poder do foco!',
      description: 'Descubra como a atenção plena pode moldar o cérebro, fortalecer conexões, quebrar padrões antigos, reduz o estresse e amplifica foco e clareza.',
      duration: '5 minutos',
      category: 'Atenção Plena'
    },
    {
      id: 2,
      title: 'Transformando a ansiedade',
      description: 'Aprenda técnicas para transformar a ansiedade em energia positiva e produtiva.',
      duration: '8 minutos',
      category: 'Ansiedade'
    },
    {
      id: 3,
      title: 'Autoimagem positiva',
      description: 'Construa uma imagem saudável de si mesmo através da aceitação e amor próprio.',
      duration: '6 minutos',
      category: 'Autoimagem'
    },
    {
      id: 4,
      title: 'Encontrando motivação',
      description: 'Descubra sua fonte interior de motivação e como mantê-la acesa.',
      duration: '7 minutos',
      category: 'Motivação'
    }
  ];

  const categories = ['todos', 'Ansiedade', 'Autoimagem', 'Atenção Plena', 'Motivação', 'Relacionamentos'];

  const filteredVideos = selectedFilter === 'todos' 
    ? videos 
    : videos.filter(v => v.category === selectedFilter);

  const currentVideo = filteredVideos[currentVideoIndex];
  const totalVideos = filteredVideos.length;

  const handleNext = () => {
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Vídeos</Text>

        {/* Filtros por categoria */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedFilter === category && styles.filterChipActive
              ]}
              onPress={() => {
                setSelectedFilter(category);
                setCurrentVideoIndex(0);
              }}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === category && styles.filterTextActive
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Card do vídeo atual */}
        <GlassBox style={styles.videoCard}>
          <Text style={styles.videoTitle}>{currentVideo.title}</Text>
          
          <Text style={styles.videoDescription}>{currentVideo.description}</Text>
          
          <Text style={styles.videoDuration}>Duração: {currentVideo.duration}</Text>

          {/* Placeholder do vídeo */}
          <View style={styles.videoPlaceholder}>
            <Text style={styles.placeholderText}>📹</Text>
          </View>

          <ButtonPrimary
            title="Assistir agora"
            onPress={() => console.log('▶️ Reproduzindo:', currentVideo.title)}
            width={220}
          />
        </GlassBox>

        {/* Navegação entre vídeos */}
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