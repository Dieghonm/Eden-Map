import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Confirmation';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function Confirmation({ onGoHome }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Guia Eden Map</Text>
        <Text style={styles.subtitle}>
          Nossa <Text style={styles.highlight}>jornada imersiva</Text> o coloca em um mundo virtual onde,{' '}
          <Text style={styles.highlight}>diariamente</Text>, algo <Text style={styles.highlight}>novo</Text> se apresenta para você.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Transforme seu subconsciente através dos nossos:</Text>

      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Vídeos e aulas</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Meditações e visualizações</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Perguntas reflexivas</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Missões e conquistas</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Track de emoções</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Ressignifique seus medos</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.checkIcon} />
          <Text style={styles.featureText}>Exercícios de gratidão</Text>
        </View>
      </View>

      <ButtonPrimary
        title="Ir para home"
        onPress={onGoHome}
      />
    </View>
  );
}