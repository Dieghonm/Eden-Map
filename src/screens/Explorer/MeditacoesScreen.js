import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/MeditacoesScreen';
import ButtonSecundary from '../../components/ButtonSecundary';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import { MISSAO } from '../../../assets/json/Semanas';
import GlassBox from '../../components/GlassBox';

export default function MissoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedMedit, setselectedMedit] = useState(null); 

  const keyMap = {
    "Atenção Plena": "Atencao_Plena",
    "Motivação": "Motivacao"
  };

  const chave = keyMap[selectedPath?.nome] || selectedPath?.nome;
  const lista = selectedPath ? (MISSAO[chave] || []) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = lista.length / 2;
  const current = lista[currentIndex * 2];

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handleNext() {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  }

  if (!selectedPath) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Text style={styles.title}>Escolha qualquer meditação da biblioteca</Text>
        <Text style={styles.text}>Mais de 35 opções disponíveis.</Text>

        {CAMINHOS.map((path) => (
          <TouchableOpacity
            key={path.nome}
            style={[styles.pathButton, { borderColor: path.color, borderWidth: 2 }]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedPath(path)
              setCurrentIndex(0)
            }}
          >
            <Text style={styles.pathText}>{path.nome}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.pathButton, { borderColor: '#EFFB3E', borderWidth: 2 }]}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedPath({ nome: 'Outros', color: '#EFFB3E' })
            setCurrentIndex(0)
          }}
        >
          <Text style={styles.pathText}>Extras</Text>
        </TouchableOpacity>

        <ButtonSecundary 
          title={'Voltar'} 
          onPress={() => navigation.goBack()} 
        />
      </SafeAreaView>
    );
  }

  if(!selectedMedit){

    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.spacing}/>
      <Text style={[styles.title, { color: selectedPath.color }]}>
        {selectedPath.nome}
      </Text>
        <GlassBox>
          <Text style={styles.tema}>
            {current ? `Tema: ${current.Titulo}` : "Sem itens disponíveis"}
          </Text>
          {current && current.img && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: current.img }} 
                style={styles.imageConcluida}
                resizeMode="cover"
              />
            </View>
          )}
  
        </GlassBox>
  
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={[
              styles.navIcon,
              currentIndex === 0 && styles.navIconDisabled
            ]}>◀</Text>
          </TouchableOpacity>
  
          <Text style={styles.counter}>
            {total > 0 ? `${currentIndex + 1}/${total}` : "0/0"}
          </Text>
  
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleNext}
            disabled={currentIndex === total - 1}
          >
            <Text style={[
              styles.navIcon,
              currentIndex === total - 1 && styles.navIconDisabled
            ]}>▶</Text>
          </TouchableOpacity>
        </View>
  
        <ButtonPrimary 
          title={'Escolher e avançar'} 
          onPress={() => setselectedMedit(!selectedMedit)} 
        />
  
        <ButtonSecundary 
          title={'Voltar'} 
          onPress={() => setSelectedPath(null)} 
        />
      </SafeAreaView>
    );
  }

  return(
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {console.log(selectedPath)      }



    </SafeAreaView>
  )
}
