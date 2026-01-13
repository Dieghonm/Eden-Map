import React, { useContext, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Home/Home';
import { SENTIMENTOS, CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import EditModal from './EditModal';

export default function Home({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    desireName,
    selectedFeelings,
    selectedPath
  } = useContext(AppContext);

  const caminhoSelecionado = useMemo(
    () => CAMINHOS.find(cam => cam.nome === selectedPath),
    [selectedPath]
  );

  const sentimentosSelecionados = useMemo(
    () => SENTIMENTOS.filter(s => selectedFeelings.includes(s.id)),
    [selectedFeelings]
  );

  const handleEdit = () => {
    setModalVisible(prev => !prev);
  };

  const handleNavigate = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo ao Eden Map</Text>
      <Text style={styles.text}>
        Encontre o <Text style={styles.highlight}>paraíso </Text>dentro de você!
      </Text>
      <Text style={styles.cardTitle}>
        {desireName.charAt(0).toUpperCase() + desireName.slice(1)}
      </Text>
      <View style={styles.line} />
      <GlassBox style={styles.desireCard}>
        <Text style={styles.path}>Caminho: {selectedPath}</Text>
          {caminhoSelecionado?.img && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: caminhoSelecionado.img }}
                style={styles.pathImage}
                resizeMode="cover"
              />
            </View>
          )}
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </GlassBox>
      <ButtonPrimary
        title="Iniciar Jornada"
        onPress={() => handleNavigate('Day')}
      />
      <ButtonSecundary
        title="Explorar"
        onPress={() => handleNavigate('Explorer')}
      />
      <EditModal
        visible={modalVisible}
        onClose={handleEdit}
      />
    </View>
  );
}
