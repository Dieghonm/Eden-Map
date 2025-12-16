import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { trackingRespostas = {} } = useJourney();

  const values = [
    trackingRespostas.triste ?? 0,
    trackingRespostas.neutro ?? 0,
    trackingRespostas.feliz ?? 0,
  ];

  
  const barColors = [
    theme.warning,
    theme.alert,
    theme.success,
  ];

  const total = values.reduce((a, b) => a + b, 0) || 1;
  const maxBarHeight = 100;

  useEffect(() => {
    console.log('📊 Tracking Respostas:', JSON.stringify(trackingRespostas, null, 2));
  }, [trackingRespostas]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Como você se sentiu durante a sua jornada?
        </Text>

        <GlassBox>
          <View style={styles.chartContainer}>
            <View style={styles.barsRow}>
              {values.map((value, index) => {
                const height = (value / total) * maxBarHeight;

                return (
                  <View key={index} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor: barColors[index],
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.separator} />

            <Image source={require("../../../assets/icons/Triste.png")} />
            <Image source={require("../../../assets/icons/Neutro.png")} />
            <Image source={require("../../../assets/icons/Feliz.png")} />

            <View style={styles.labelsRow}>
              {values.map((value, index) => {
                const percentage = Math.round((value / total) * 100);

                return (
                  <Text key={index} style={styles.barLabel}>
                    {percentage}%
                  </Text>
                );
              })}
            </View>
          </View>
        </GlassBox>

        <Text style={styles.subtitle}>
          Quanto
          <Text style={styles.highlight}> mais positivo </Text>
          for esse balanço, mais fácil se torna,
          <Text style={styles.highlight}> atrair seu desejo</Text>.
        </Text>

        <ButtonPrimary
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

