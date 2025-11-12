// src/screens/Starting/Track.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Track';
import { storeData } from '../../utils/storage';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function Track({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedPath, setSelectedPath] = useState(null);

  const handleComplete = async () => {
    if (!selectedPath) return;

    try {
      await storeData('selectedPath', selectedPath);
      console.log('✅ Caminho salvo:', selectedPath);
      console.log('🎉 Guia completo!');
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('❌ Erro ao salvar caminho:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pathsContainer}>
        <Text style={styles.sectionTitle}>Os caminhos</Text>
        
        {CAMINHOS.map((path) => (
          <TouchableOpacity
            key={path.id}
            style={[
              styles.pathButton,
              { borderColor: path.color, borderWidth: 2 },
              selectedPath === path.id && styles.pathButtonSelected,
            ]}
            onPress={() => setSelectedPath(path.id)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.pathText,
              selectedPath === path.id && styles.pathTextSelected,
            ]}>
              {path.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title='Descubra seu caminho'
        onPress={handleComplete}
        disabled={!selectedPath}
      />
    </View>
  );
}