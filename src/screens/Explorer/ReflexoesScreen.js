import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedTab, setSelectedTab] = useState('tracking');

  // Mock de dados
  const trackingData = {
    question: 'Como você se sentiu durante a sua jornada?',
    options: [
      { emoji: '😢', label: '30%', value: 30, color: '#EA5959' },
      { emoji: '😐', label: '10%', value: 10, color: '#FFAA2E' },
      { emoji: '😊', label: '60%', value: 60, color: '#38C197' }
    ],
    feedback: 'Quanto mais positivo for esse balanço, mais fácil fica tomar ações, atingir seu desejo.',
    responses: [
      { id: 1, text: 'Minha segurança parece depender do controle total do que me cerca.' },
      { id: 2, text: 'A falta de foco tem me afastado dos meus objetivos mais importantes.' },
      { id: 3, text: 'Falta de motivação tem travado o avanço que eu tanto busco.' }
    ]
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Reflexões - tela inicial - tracking</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'tracking' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('tracking')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'tracking' && styles.tabTextActive
            ]}>
              Reflexões - tela inicial - tracking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'responses' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('responses')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'responses' && styles.tabTextActive
            ]}>
              Respostas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo - Tracking */}
        {selectedTab === 'tracking' && (
          <GlassBox style={styles.trackingCard}>
            <Text style={styles.question}>{trackingData.question}</Text>

            {/* Gráfico de barras */}
            <View style={styles.chartContainer}>
              <View style={styles.barsRow}>
                {trackingData.options.map((option, index) => (
                  <View key={index} style={styles.barColumn}>
                    <View style={styles.barWrapper}>
                      <View 
                        style={[
                          styles.bar,
                          { 
                            height: `${option.value}%`,
                            backgroundColor: option.color 
                          }
                        ]}
                      />
                    </View>
                    <View style={[styles.emoji, { backgroundColor: option.color }]}>
                      <Text style={styles.emojiText}>{option.emoji}</Text>
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.percentagesRow}>
                {trackingData.options.map((option, index) => (
                  <Text 
                    key={index} 
                    style={[styles.percentage, { color: option.color }]}
                  >
                    {option.label}
                  </Text>
                ))}
              </View>
            </View>

            <Text style={styles.feedback}>
              {trackingData.feedback.split('positivo').map((part, i, arr) => (
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <Text style={styles.highlight}>positivo</Text>
                  </React.Fragment>
                ) : part
              ))}
            </Text>

            <ButtonPrimary
              title="Respostas"
              onPress={() => setSelectedTab('responses')}
              width={220}
            />
          </GlassBox>
        )}

        {/* Conteúdo - Respostas */}
        {selectedTab === 'responses' && (
          <View style={styles.responsesContainer}>
            {trackingData.responses.map((response) => (
              <TouchableOpacity
                key={response.id}
                style={styles.responseCard}
                onPress={() => console.log('📝 Ver resposta:', response.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.responseText}>{response.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ButtonPrimary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}