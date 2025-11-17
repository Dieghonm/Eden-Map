import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/MissoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function MissoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedTab, setSelectedTab] = useState('andamento');

  // Mock de missões
  const missions = {
    andamento: [
      {
        id: 1,
        title: 'Missão em andamento (status da missão atual)',
        description: 'Realize 3 meditações guiadas de atenção plena nesta semana.',
        progress: 2,
        total: 3,
        status: 'andamento'
      }
    ],
    passadas: [
      {
        id: 2,
        title: 'Missões passadas (entradas e descrição)',
        description: 'Pratique 5 minutos de respiração consciente diariamente.',
        status: 'completa',
        completedAt: '15/01/2025'
      },
      {
        id: 3,
        title: 'Gratidão diária',
        description: 'Escreva 3 coisas pelas quais você é grato todos os dias.',
        status: 'completa',
        completedAt: '10/01/2025'
      },
      {
        id: 4,
        title: 'Conexão social',
        description: 'Tenha uma conversa significativa com alguém próximo.',
        status: 'completa',
        completedAt: '05/01/2025'
      }
    ]
  };

  const currentMissions = missions[selectedTab];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Missões</Text>

        {/* Tabs de filtro */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'andamento' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('andamento')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'andamento' && styles.tabTextActive
            ]}>
              Missão em andamento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'passadas' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('passadas')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'passadas' && styles.tabTextActive
            ]}>
              Missões passadas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo das missões */}
        <View style={styles.missionsContainer}>
          {selectedTab === 'andamento' && (
            <GlassBox style={styles.missionCard}>
              <Text style={styles.missionTitle}>{currentMissions[0].title}</Text>
              
              <Text style={styles.missionDescription}>
                {currentMissions[0].description}
              </Text>

              {/* Barra de progresso */}
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Progresso</Text>
                <View style={styles.progressBarBg}>
                  <View 
                    style={[
                      styles.progressBarFill,
                      { 
                        width: `${(currentMissions[0].progress / currentMissions[0].total) * 100}%` 
                      }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {currentMissions[0].progress}/{currentMissions[0].total} completas
                </Text>
              </View>

              <ButtonPrimary
                title="Ver detalhes"
                onPress={() => console.log('📋 Ver detalhes da missão')}
                width={220}
              />
            </GlassBox>
          )}

          {selectedTab === 'passadas' && (
            <>
              {currentMissions.map((mission) => (
                <TouchableOpacity
                  key={mission.id}
                  style={styles.pastMissionCard}
                  onPress={() => console.log('📜 Ver missão:', mission.title)}
                  activeOpacity={0.7}
                >
                  <View style={styles.pastMissionHeader}>
                    <Text style={styles.checkIcon}>✓</Text>
                    <View style={styles.pastMissionInfo}>
                      <Text style={styles.pastMissionTitle}>{mission.title}</Text>
                      <Text style={styles.pastMissionDate}>
                        Concluída em {mission.completedAt}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.pastMissionDescription}>
                    {mission.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        <ButtonPrimary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}