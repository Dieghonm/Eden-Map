import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Feeling';
import { storeData } from '../../utils/storage';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

const FEELINGS = [
  { id: 1, nome: 'Amor', color: '#EA5959' },
  { id: 2, nome: 'Confiança', color: '#FFAA2E' },
  { id: 3, nome: 'Equilíbrio', color: '#8A4AED' },
  { id: 4, nome: 'Esperança', color: '#38C197' },
  { id: 5, nome: 'Felicidade', color: '#FFFF56' },
  { id: 6, nome: 'Liberdade', color: '#45A7F8' },
  { id: 7, nome: 'Sensualidade', color: '#F552BF' },
];

export default function Feeling({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedFeelings, setSelectedFeelings] = useState([]);

  const toggleFeeling = (id) => {
    if (selectedFeelings.includes(id)) {
      setSelectedFeelings(selectedFeelings.filter(f => f !== id));
    } else if (selectedFeelings.length < 3) {
      setSelectedFeelings([...selectedFeelings, id]);
    }
  };

  const handleNext = async () => {
    if (selectedFeelings.length !== 3) return;

    try {
      await storeData('selectedFeelings', selectedFeelings);
      onNext();
    } catch (error) {
      console.error('Erro ao salvar sentimentos:', error);
    }
  };

  const isFormValid = selectedFeelings.length === 3;

  return (
    <View style={styles.container}>
      <GlassBox >
        {FEELINGS.map((feeling) => {
          const isSelected = selectedFeelings.includes(feeling.id);
          return (
            <TouchableOpacity
              key={feeling.id}
              style={styles.feelingButton}
              onPress={() => toggleFeeling(feeling.id)}
              activeOpacity={0.8}
              disabled={!isSelected && selectedFeelings.length >= 3}
            >
              <View style={styles.feelingRow}>
                <Text style={styles.feelingText}>{feeling.nome}</Text>
                <View
                  style={[
                    styles.checkCircle,
                    { backgroundColor: feeling.color }
                  ]}
                />
              </View>
              <Image
                source={
                  isSelected
                    ? require('../../../assets/icons/Checked.png')
                    : require('../../../assets/icons/Unchecked.png')
                }
                style={styles.playIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      <View style={styles.spacer}/>
      </GlassBox>
      <ButtonPrimary
        title="Próximo passo"
        onPress={handleNext}
        disabled={!isFormValid}
      />
    </View>
  );
}
