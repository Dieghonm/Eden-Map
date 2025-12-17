import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Result';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonSecundary from '../../components/ButtonSecundary';
import ButtonPrimary from '../../components/ButtonPrimary';
import { api } from '../../services/api';

export default function Result({ results, onNext, onRetake }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useContext(AppContext);

  const [enviandoDados, setEnviandoDados] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

      await api.atualizarTestResults(user.email, testResults);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setEnviandoDados(false);
    }
  };

  const handlePathSelection = async (pathName) => {
    await enviarResultadosTeste();
    onNext(pathName);
  };

  const handleConfirmRetake = () => {
    setShowConfirm(false);
    onRetake();
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
        {Results.map(result => (
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

      <ButtonSecundary
        title="Refazer teste"
        onPress={() => setShowConfirm(true)}
        disabled={enviandoDados}
      />

      <Modal
        transparent
        animationType="fade"
        visible={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            width: '80%',
            backgroundColor: theme.background,
            borderRadius: 16,
            padding: 20
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: theme.fontColor,
              marginBottom: 10,
              textAlign: 'center'
            }}>
              Deseja refazer o teste?
            </Text>

            <Text style={{
              fontSize: 14,
              color: theme.fontColor,
              textAlign: 'center',
              marginBottom: 20
            }}>
              Deseja realmente refazer o teste? Isso apagará seus resultados atuais.{'\n'}{'\n'}
              Se quiser continuar para o Eden, basta selecionar o caminho que mais faz sentido para você.
            </Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <ButtonSecundary
                  title="Cancelar"
                  onPress={() => setShowConfirm(false)}
                  width={130}
                />
              </View>

              <View style={{ flex: 1 }}>
                <ButtonPrimary
                  title="Refazer"
                  onPress={handleConfirmRetake}
                  width={130}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
