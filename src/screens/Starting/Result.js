import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Result';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import { api } from '../../services/api';

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

      const testeResultados = {};
      Results.forEach(result => {
        testeResultados[result.name] = result.percentage;
      });

      const response = await api.atualizarTestResults({
        email:user.email,
        test_results: testeResultados
      });

      console.log('✅ Resultados do teste salvos:', response);
      return true;

    } catch (error) {
      console.error('❌ Erro ao salvar resultados:', error);
      
      Alert.alert(
        'Erro',
        'Não foi possível salvar os resultados do teste. Você pode continuar, mas os dados não serão salvos.',
        [
          { text: 'Continuar Mesmo Assim', style: 'default' },
          { text: 'Tentar Novamente', onPress: () => enviarResultadosTeste() }
        ]
      );
      
      return false;
    } finally {
      setEnviandoDados(false);
    }
  };

  /**
   * ✨ HANDLER PARA SELECIONAR CAMINHO
   * Envia os resultados do teste antes de prosseguir
   */
  const handlePathSelection = async (pathName) => {
    // Primeiro, salva os resultados do teste
    const sucesso = await enviarResultadosTeste();
    
    // Continua mesmo se falhar (usuário decidiu)
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
        <Text style={styles.subtitle}>Salvando resultados...</Text>
      )}

      <ButtonPrimary
        title="Refazer teste"
        onPress={onRetake}
        disabled={enviandoDados}
      />
    </View>
  );
}