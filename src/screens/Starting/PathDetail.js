import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/PathDetail';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import Img from '../../components/Img';

export default function PathDetail({ selectedPathName, onConfirm, onBack }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const pathData = CAMINHOS.find(c => c.nome === selectedPathName);

  if (!pathData) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{pathData.nome}</Text>
        <Text style={styles.subtitle}>
          {pathData.descricao[0]}
          <Text style={styles.highlight}>{pathData.descricao[1]}</Text>
          {pathData.descricao[2]}
          <Text style={styles.highlight}>{pathData.descricao[3]}</Text>
          {pathData.descricao[4]}
          <Text style={styles.highlight}>{pathData.descricao[5]}</Text>
          {pathData.descricao[6]}     
        </Text>
      </View>
      {/* Placeholder para vídeo/imagem */}
      <View style={styles.mediaContainer}>
        <Img 
          source={require('../../../assets/42.png')}
          size={220}
        />
      </View>
      <ButtonPrimary
        title="Seguir esse caminho"
        onPress={onConfirm}
      />
      <ButtonSecundary
        title="Escolher outro tema"
        onPress={onBack}
      />
    </View>
  );
}