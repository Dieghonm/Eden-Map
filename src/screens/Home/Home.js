import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Home/Home';
import { getData } from '../../utils/storage';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import { spacing } from '../../theme/texts';

const SENTIMENTOS = [
  { id: 1, nome: 'Amor', color: '#EA5959' },
  { id: 2, nome: 'Confiança', color: '#FFAA2E' },
  { id: 3, nome: 'Equilíbrio', color: '#8A4AED' },
  { id: 4, nome: 'Esperança', color: '#38C197' },
  { id: 5, nome: 'Felicidade', color: '#FFFF56' },
  { id: 6, nome: 'Liberdade', color: '#45A7F8' },
  { id: 7, nome: 'Sensualidade', color: '#F552BF' },
];

const CAMINHOS = [
  { id: 1, nome: 'Ansiedade' },
  { id: 2, nome: 'Autoimagem' },
  { id: 3, nome: 'Atenção Plena' },
  { id: 4, nome: 'Motivação' },
  { id: 5, nome: 'Relacionamentos' },
];

export default function Home({ onEditFeeling }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [desireName, setDesireName] = useState('Nome do desejo');
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [desireDescription, setDesireDescription] = useState('');
  const [showExplorerModal, setShowExplorerModal] = useState(false);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedName = await getData('desireName');
      const savedDescription = await getData('desireDescription');
      const savedFeelings = await getData('selectedFeelings');
      const savedPath = await getData('selectedPath');
      
      if (savedName) setDesireName(savedName);
      if (savedDescription) setDesireDescription(savedDescription);
      if (savedFeelings) setSelectedFeelings(savedFeelings);
      if (savedPath) setSelectedPath(savedPath);
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
    }
  };

  const handleEdit = () => {
    if (onEditFeeling) {
      onEditFeeling();
    }
  };

  const handleEntrarEden = () => {
    const pathName = CAMINHOS.find(c => c.id === selectedPath)?.nome || 'Não definido';
    const feelingNames = getSelectedFeelings().map(f => f.nome);
    
    console.log('🌟 ENTRADA DO EDEN 🌟');
    console.log('Desejo:', desireName);
    console.log('Descrição:', desireDescription);
    console.log('Sentimentos:', feelingNames);
    console.log('Caminho:', pathName);
  };

  const handleExplorar = async () => {
    try {
      const allData = {
        desireName: await getData('desireName'),
        desireDescription: await getData('desireDescription'),
        selectedFeelings: await getData('selectedFeelings'),
        selectedPath: await getData('selectedPath'),
        user: await getData('user'),
        theme: await getData('theme'),
      };

      console.log('📦 DADOS DO ASYNCSTORAGE:');
      console.log(JSON.stringify(allData, null, 2));
      
      setShowExplorerModal(true);
    } catch (error) {
      console.error('❌ Erro ao explorar storage:', error);
    }
  };

  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  const getPathName = () => {
    return CAMINHOS.find(c => c.id === selectedPath)?.nome || 'Não definido';
  };

  return (
    <View style={styles.container}>
      <WelcomeText
        title='Bem-Vindo ao Eden Map'
        subtitle='Encontre o paraíso dentro de você!'
      />

      <GlassBox style={styles.desireCard}>
        <Text style={styles.cardTitle}>{desireName}</Text>
        
        <View style={styles.feelingsContainer}>
          {getSelectedFeelings().map((feeling) => (
            <View 
              key={feeling.id} 
              style={[styles.feelingChip, { backgroundColor: feeling.color }]}
            >
              <Text style={styles.feelingText}>{feeling.nome}</Text>
            </View>
          ))}
        </View>

        <ButtonSecundary
          title='Editar'
          onPress={handleEdit}
          width={160}
          height={40}
        />
      </GlassBox>

      <ButtonPrimary
        title='Entrada do Eden'
        onPress={handleEntrarEden}
        width={290}
      />

      <ButtonSecundary
        title='Explorar'
        onPress={handleExplorar}
        width={290}
      />
    </View>
  );
}