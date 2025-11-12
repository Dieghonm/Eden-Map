import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
  { id: 3, nome: 'Equilíbrio', color: '#B98EFF' },
  { id: 4, nome: 'Esperança', color: '#38C197' },
  { id: 5, nome: 'Felicidade', color: '#F4E04D' },
  { id: 6, nome: 'Liberdade', color: '#0A84FF' },
  { id: 7, nome: 'Sensualidade', color: '#FF6EC7' },
];

export default function Home({ onRefresh }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [desireName, setDesireName] = useState('Nome do desejo');
  const [selectedFeelings, setSelectedFeelings] = useState([]);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedName = await getData('desireName');
      const savedFeelings = await getData('selectedFeelings');
      
      if (savedName) setDesireName(savedName);
      if (savedFeelings) setSelectedFeelings(savedFeelings);
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
    }
  };

  const handleEdit = () => {
    console.log('Editar pressionado - implementar modal ou navegação');
  };

  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  return (
    <View style={styles.container}>
      <Logo width={spacing.lg} height={spacing.md} />
      
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
        onPress={() => console.log('Entrada do Eden')}
        width={290}
      />

      <ButtonSecundary
        title='Explorar'
        onPress={() => console.log('Explorar')}
        width={290}
      />
    </View>
  );
}