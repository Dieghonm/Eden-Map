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

export default function Home({ onEditFeeling, navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
    const [modalVisible, setModalVisible] = useState(false);
  const { 
    desireName,
    desireDescription,
    selectedFeelings,
    selectedPath,
    user
  } = useContext(AppContext);

  const handleEdit = () => {
    // setModalVisible(!modalVisible);
  };

  const handlebutton = (screen) => {
    navigation.navigate(screen);
  };

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
        // title='Entrada do Eden'
        title='Iniciar Jornada'
        onPress={() => handlebutton('Day')}
      />

      <ButtonSecundary
        title='Explorar'
        onPress={() => handlebutton('Explorer')}
      />

      <EditModal
        visible={modalVisible}
        onClose={handleEdit}
      />
    </View>
  );
}