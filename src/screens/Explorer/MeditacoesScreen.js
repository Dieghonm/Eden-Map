import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/MeditacoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function MeditacoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedPath, setSelectedPath] = useState('Atenção Plena');
  const [currentMeditationIndex, setCurrentMeditationIndex] = useState(0);

  // Mock de meditações
  const meditationsByPath = {
    'Atenção Plena': [
      {
        id: 1,
        title: 'Escolha qualquer meditação da biblioteca',
        subtitle: 'Mais de 30 opções disponíveis.',
        category: 'Atenção Plena',
        placeholder: 'Caminho: Atenção Plena'
      }
    ],
    'Ansiedade': [
      {
        id: 2,
        title: 'Respiração para ansiedade',
        subtitle: 'Técnicas de respiração para acalmar a mente.',
        category: 'Ansiedade',
        placeholder: 'Caminho: Ansiedade'
      }
    ],
    'Autoimagem': [
      {
        id: 3,
        title: 'Amor próprio',
        subtitle: 'Cultive uma relação saudável consigo mesmo.',
        category: 'Autoimagem',
        placeholder: 'Caminho: Autoimagem'
      }
    ],
    'Motivação': [
      {
        id: 4,
        title: 'Energia interior',
        subtitle: 'Desperte sua motivação e propósito.',
        category: 'Motivação',
        placeholder: 'Caminho: Motivação'
      }
    ],
    'Relacionamentos': [
      {
        id: 5,
        title: 'Conexões verdadeiras',
        subtitle: 'Fortaleça seus relacionamentos.',
        category: 'Relacionamentos',
        placeholder: 'Caminho: Relacionamentos'
      }
    ]
  };

  const paths = Object.keys(meditationsByPath);
  const currentMeditations = meditationsByPath[selectedPath];
  const currentMeditation = currentMeditations[currentMeditationIndex];
  const totalMeditations = currentMeditations.length;

  const handleNext = () => {
    if (currentMeditationIndex < totalMeditations - 1) {
      setCurrentMeditationIndex(currentMeditationIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMeditationIndex > 0) {
      setCurrentMeditationIndex(currentMeditationIndex - 1);
    }
  };

  const handlePathChange = (path) => {
    setSelectedPath(path);
    setCurrentMeditationIndex(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Meditações livres - escolha caminho</Text>

        {/* Seletor de caminhos */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.pathScroll}
          contentContainerStyle={styles.pathContent}
        >
          {paths.map((path) => (
            <TouchableOpacity
              key={path}
              style={[
                styles.pathChip,
                selectedPath === path && styles.pathChipActive
              ]}
              onPress={() => handlePathChange(path)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.pathText,
                selectedPath === path && styles.pathTextActive
              ]}>
                {path}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Card da meditação */}
        <GlassBox style={styles.meditationCard}>
          <Text style={styles.meditationTitle}>{currentMeditation.title}</Text>
          <Text style={styles.meditationSubtitle}>{currentMeditation.subtitle}</Text>

          {/* Placeholder da meditação */}
          <View style={styles.meditationPlaceholder}>
            <Text style={styles.placeholderTitle}>
              {currentMeditation.placeholder}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.navButtonSmall}>
                <Text style={styles.navIconSmall}>◀</Text>
              </TouchableOpacity>
              <Text style={styles.counterSmall}>4/6</Text>
              <TouchableOpacity style={styles.navButtonSmall}>
                <Text style={styles.navIconSmall}>▶</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ButtonPrimary
            title="Escolher e avançar"
            onPress={() => console.log('🧘 Escolhida:', currentMeditation.title)}
            width={220}
          />
        </GlassBox>

        {/* Navegação entre meditações */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handlePrevious}
            disabled={currentMeditationIndex === 0}
          >
            <Text style={[
              styles.navIcon,
              currentMeditationIndex === 0 && styles.navIconDisabled
            ]}>◀</Text>
          </TouchableOpacity>

          <Text style={styles.counter}>
            {currentMeditationIndex + 1}/{totalMeditations}
          </Text>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleNext}
            disabled={currentMeditationIndex === totalMeditations - 1}
          >
            <Text style={[
              styles.navIcon,
              currentMeditationIndex === totalMeditations - 1 && styles.navIconDisabled
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