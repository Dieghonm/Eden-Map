import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/PathDetail';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import { api } from '../../services/api';

export default function PathDetail({ selectedPathName, onConfirm, onBack }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useContext(AppContext);
  const [salvandoProgresso, setSalvandoProgresso] = React.useState(false);
  
  const pathData = CAMINHOS.find(c => c.nome === selectedPathName);

  if (!pathData) return null;

  const handleConfirmPath = async () => {
    setSalvandoProgresso(true);
    try {
      if (user && user.email) {
        await api.atualizarProgresso(user.email, 1, 1);
      }
      
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      console.error('❌ Erro ao salvar progresso inicial:', error);

    } finally {
      setSalvandoProgresso(false);
    }
  };

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
      {console.log(pathData)      }
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: pathData.img }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {salvandoProgresso ? (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <ActivityIndicator size="large" color={theme.button} />
          <Text style={styles.subtitle}>Iniciando sua jornada...</Text>
        </View>
      ) : (
        <>
          <ButtonPrimary
            title="Seguir esse caminho"
            onPress={handleConfirmPath}
          />
          <ButtonSecundary
            title="Escolher outro tema"
            onPress={onBack}
          />
        </>
      )}
    </View>
  );
}