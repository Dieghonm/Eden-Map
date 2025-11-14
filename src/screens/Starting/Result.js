import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Result';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function Result({ results, onNext, onRetake }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const Results = Object.entries(results)
    .map(([name, percentage]) => {
      const caminho = CAMINHOS.find(c => c.nome === name);
      return { name, percentage, color: caminho?.color || theme.fontColor };
    });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Escolha seu caminho</Text>
        <Text style={styles.subtitle}>
          As opções de caminhos estão <Text style={styles.highlight}>ordenados</Text> com base nas suas{' '}
          <Text style={styles.highlight}>respostas do teste.</Text>
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Clique e saiba mais sobre:</Text>

      <View style={styles.resultsContainer}>
        {Results.map((result, index) => (
          <TouchableOpacity
            key={result.name}
            style={[styles.resultButton, { borderColor: result.color }]}
            onPress={() => onNext(result.name)}
            activeOpacity={0.8}
          >
            <Text style={[styles.percentage,{ color: result.color }]}>{result.percentage}%</Text>
            <Text style={styles.resultName}>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title="Refazer teste"
        onPress={onRetake}
      />
    </View>
  );
}