import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Home/Home';
import { getData } from '../../utils/storage';
import { SENTIMENTOS, CAMINHOS } from '../../../assets/json/Sentimentos';

import WelcomeText from '../../components/WelcomeText';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';

export default function Home({ onEditFeeling }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [desireName, setDesireName] = useState('Nome do desejo');
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [desireDescription, setDesireDescription] = useState('');

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
      
    } catch (error) {
      console.error('❌ Erro ao explorar storage:', error);
    }
  };

  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo ao Eden Map</Text>
      <Text style={styles.text}>Encontre o <Text style={styles.highlight}>paraíso </Text>dentro de você!</Text>
      <GlassBox style={styles.desireCard}>
        <Text style={styles.cardTitle}>
          {desireName.charAt(0).toUpperCase() + desireName.slice(1)}
        </Text>
        <View style={styles.line}/>
        <View style={styles.feelingsContainer}>
          {getSelectedFeelings().map((feeling) => (
            <View 
              key={feeling.id} 
              style={styles.feelingChip}
            >
              <Text style={styles.feelingText}>{feeling.nome}</Text>
              <View style={[styles.color, { backgroundColor: feeling.color }]}/>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </GlassBox>

      <ButtonPrimary
        title='Entrada do Eden'
        onPress={handleEntrarEden}
      />

      <ButtonSecundary
        title='Explorar'
        onPress={handleExplorar}
      />
    </View>
  );
}