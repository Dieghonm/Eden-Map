// src/screens/Starting/Results.js - VERSÃO CORRIGIDA
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Result';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import { api } from '../../services/api';
import ButtonSecundary from '../../components/ButtonSecundary';

export default function Result({ results, onNext, onRetake }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useContext(AppContext);
  
  const [enviandoDados, setEnviandoDados] = useState(false);

  const Results = Object.entries(results)
    .map(([name, percentage]) => {
      const caminho = CAMINHOS.find(c => c.nome === name);
      return { name, percentage, color: caminho?.color || theme.fontColor };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const enviarResultadosTeste = async () => {
    try {
      setEnviandoDados(true);
      const testResults = {
        Ansiedade: 0,
        Atenção_Plena: 0,
        Autoimagem: 0,
        Motivação: 0,
        Relacionamentos: 0
      };

      Results.forEach(result => {
        const key = result.name === 'Atenção Plena' 
          ? 'Atenção_Plena' 
          : result.name;
        testResults[key] = result.percentage;
      });

      const response = await api.atualizarTestResults(
        user.email,
        testResults
      );
      return true;

    } catch (error) {
      console.error('❌ Erro ao salvar resultados:', error);
      
      return false;
    } finally {
      setEnviandoDados(false);
    }
  };

  const handlePathSelection = async (pathName) => {
    await enviarResultadosTeste();
    
    onNext(pathName);
  };

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
            onPress={() => handlePathSelection(result.name)}
            activeOpacity={0.8}
            disabled={enviandoDados}
          >
            <Text style={[styles.percentage, { color: result.color }]}>
              {result.percentage}%
            </Text>
            <Text style={styles.resultName}>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {enviandoDados && (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Text style={styles.subtitle}>Salvando resultados...</Text>
        </View>
      )}

      <ButtonSecundary // mudado para evitar confuzao!
        title="Refazer teste"
        onPress={onRetake}
        disabled={enviandoDados}
      />
    </View>
  );
}