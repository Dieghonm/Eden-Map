import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Home/Home';
import { SENTIMENTOS, CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import EditModal from './EditModal';


export default function Home({ onEditFeeling }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [modalVisible, setModalVisible] = useState(false);
  
  // Pega TODOS os dados do Provider (somente leitura)
  const { 
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    user
  } = useContext(AppContext);

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSave = () => {
    // Callback opcional quando salvar
    console.log('✅ Dados atualizados com sucesso!');
  };

  const handleEntrarEden = () => {
    const pathName = CAMINHOS.find(c => c.id === selectedPath)?.nome || 'Não definido';
    const feelingNames = getSelectedFeelings().map(f => f.nome);
    
    console.log('🌟 ENTRADA DO EDEN 🌟');
    console.log('Usuário:', user?.login || 'Não logado');
    console.log('Desejo:', desireName);
    console.log('Descrição:', desireDescription);
    console.log('Sentimentos:', feelingNames);
    console.log('Caminho:', pathName);
  };

  const handleExplorar = () => {
    console.log('📦 DADOS DO PROVIDER:');
    console.log('User:', user);
    console.log('Desire Name:', desireName);
    console.log('Desire Description:', desireDescription);
    console.log('Selected Feelings:', selectedFeelings);
    console.log('Selected Path:', selectedPath);
    console.log('---');
  };

  // Helper para pegar os objetos completos dos sentimentos
  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo ao Eden Map</Text>
      <Text style={styles.text}>
        Encontre o <Text style={styles.highlight}>paraíso </Text>dentro de você!
      </Text>

      <GlassBox style={styles.desireCard}>
        <Text style={styles.cardTitle}>
          {desireName ? 
            desireName.charAt(0).toUpperCase() + desireName.slice(1) : 
            'Sem desejo definido'}
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
        title='Explorar Dados'
        onPress={handleExplorar}
      />

      <EditModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </View>
  );
}