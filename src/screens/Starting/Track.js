import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Track';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function Track({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // Pega dados e setter do Provider
  const { 
    selectedPath: savedPath,
    setSelectedPath 
  } = useContext(AppContext);

  // Estado local sincronizado com Provider
  const [localPath, setLocalPath] = useState(savedPath || null);

  // Sincroniza com Provider quando componente monta
  useEffect(() => {
    if (savedPath) {
      setLocalPath(savedPath);
    }
  }, []);

  const handleComplete = async () => {
    if (!localPath) return;

    // Salva no Provider (que salva automaticamente no storage)
    await setSelectedPath(localPath);
    
    console.log('🎉 Guia completo!');
    
    if (onComplete) {
      onComplete();
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
              localPath === path.id && styles.pathButtonSelected,
            ]}
            onPress={() => setLocalPath(path.id)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.pathText,
              localPath === path.id && styles.pathTextSelected,
            ]}>
              {path.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title='Descubra seu caminho'
        onPress={handleComplete}
        disabled={!localPath}
      />
    </View>
  );
}