// src/screens/Starting/Track.js - CORRIGIDO
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Track';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useState } from 'react';
import ButtonSecundary from '../../components/ButtonSecundary';

export default function Track({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.pathsContainer}>
        <Text style={styles.sectionTitle}>Os caminhos</Text>
        
        {CAMINHOS.map((path) => (
          <TouchableOpacity
            key={path.nome}
            style={[styles.pathButton, { borderColor: path.color, borderWidth: 2 }]}
            activeOpacity={0.8}
            onPress={() => setSelectedPath(path)}
          >
            <Text style={styles.pathText}>{path.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title="Fazer teste"
        onPress={onNext}
      />

      <Modal 
        transparent 
        visible={!!selectedPath} 
        animationType="fade"
        onRequestClose={() => setSelectedPath(null)}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedPath(null)}
        >
          <View
            style={[
              styles.modalBox,
              selectedPath && { borderColor: selectedPath.color, borderWidth: 2 }
            ]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>{selectedPath?.nome}</Text>

            {selectedPath && Array.isArray(selectedPath.descricao) && (
              <View>
                <Text style={styles.modalDescription}>
                  {selectedPath.descricao[0]}
                  <Text style={styles.highlight}>{selectedPath.descricao[1]}</Text>
                  {selectedPath.descricao[2]}
                  <Text style={styles.highlight}>{selectedPath.descricao[3]}</Text>
                  {selectedPath.descricao[4]}
                  <Text style={styles.highlight}>{selectedPath.descricao[5]}</Text>
                  {selectedPath.descricao[6]}
                </Text>
              </View>
            )}

            <ButtonSecundary
              title="Fechar"
              onPress={() => setSelectedPath(null)}
              width={130}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}