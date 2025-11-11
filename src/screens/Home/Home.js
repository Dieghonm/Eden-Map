import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Home/Home';
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

export default function Home() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [selectedFeelings, setSelectedFeelings] = useState([4, 5, 6]); // IDs: Esperança, Felicidade, Liberdade
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState([]);

  const handleOpenModal = () => {
    setTempSelected([...selectedFeelings]);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTempSelected([]);
  };

  const handleSaveSelection = () => {
    setSelectedFeelings([...tempSelected]);
    setModalVisible(false);
    console.log('Sentimentos salvos:', tempSelected);
  };

  const toggleFeeling = (id) => {
    if (tempSelected.includes(id)) {
      setTempSelected(tempSelected.filter(f => f !== id));
    } else if (tempSelected.length < 3) {
      setTempSelected([...tempSelected, id]);
    }
  };

  const getSelectedFeelings = () => {
    return SENTIMENTOS.filter(s => selectedFeelings.includes(s.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo ao Eden Map</Text>
      <Text style={styles.subtitle}>
        Encontre o <Text style={styles.highlight}>paraíso</Text> dentro de você!
      </Text>

      <GlassBox style={styles.desireCard}>
        <Text style={styles.cardTitle}>Nome do desejo</Text>
        
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
          onPress={handleOpenModal}
          width={160}
          height={40}
        />
      </GlassBox>

      <ButtonPrimary
        title='Entrada do Eden'
        onPress={() => console.log('Entrada do Eden pressionado')}
        width={290}
      />

      <ButtonSecundary
        title='Explorar'
        onPress={() => console.log('Explorar pressionado')}
        width={290}
      />

      {/* Modal de Seleção */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <GlassBox style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione 3 sentimentos</Text>
            
            <View style={styles.modalFeelingsList}>
              {SENTIMENTOS.map((feeling) => (
                <TouchableOpacity
                  key={feeling.id}
                  style={[
                    styles.modalFeelingItem,
                    { backgroundColor: feeling.color },
                    tempSelected.includes(feeling.id) && styles.modalFeelingSelected,
                  ]}
                  onPress={() => toggleFeeling(feeling.id)}
                  activeOpacity={0.7}
                  disabled={!tempSelected.includes(feeling.id) && tempSelected.length >= 3}
                >
                  <Text style={styles.modalFeelingText}>{feeling.nome}</Text>
                  {tempSelected.includes(feeling.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <ButtonSecundary
                title='Cancelar'
                onPress={handleCloseModal}
                width={120}
                height={40}
              />
              <ButtonPrimary
                title='Salvar'
                onPress={handleSaveSelection}
                disabled={tempSelected.length !== 3}
                width={120}
                height={40}
              />
            </View>
          </GlassBox>
        </View>
      </Modal>
    </View>
  );
}