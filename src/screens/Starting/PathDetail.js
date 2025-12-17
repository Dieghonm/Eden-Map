import React, { useContext, useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/PathDetail';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import { api } from '../../services/api';
import GlassBox from '../../components/GlassBox';
import ImgButton from '../../components/ImgButton';
import VideoPlayer from '../../components/VideoPlayer';

const { width } = Dimensions.get('window');

const SCREENS = {
  DETAIL: 'detail',
  JORNADA: 'jornada',
  INTRODUCAO: 'introducao'
};

export default function PathDetail({ selectedPathName, onConfirm, onBack }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useContext(AppContext);

  const [salvandoProgresso, setSalvandoProgresso] = useState(false);
  const [screen, setScreen] = useState(SCREENS.DETAIL);

  const pathData = useMemo(
    () => CAMINHOS.find(c => c.nome === selectedPathName),
    [selectedPathName]
  );

  const translateX = useRef(new Animated.Value(width)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateX.setValue(width);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  }, [screen]);

  if (!pathData) return null;
  
  const handleConfirmPath = async () => {
    setSalvandoProgresso(true);

    try {
      if (user?.email) {
        await api.atualizarProgresso(user.email, 1, 1);
      }
    } catch (error) {
      console.log('Erro ao salvar progresso, seguindo fluxo normalmente', error);
    } finally {
      setSalvandoProgresso(false);
      setScreen(SCREENS.JORNADA);
    }
  };

  const renderDescricao = () => (
    <Text style={styles.subtitle}>
      {pathData.descricao.map((item, index) =>
        index % 2 === 1 ? (
          <Text key={index} style={styles.highlight}>{item}</Text>
        ) : (
          <Text key={index}>{item}</Text>
        )
      )}
    </Text>
  );

  const renderDetail = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{pathData.nome}</Text>
        {renderDescricao()}
      </View>

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
          <ButtonPrimary title="Seguir esse caminho" onPress={handleConfirmPath} />
          <ButtonSecundary title="Escolher outro tema" onPress={onBack} />
        </>
      )}
    </View>
  );

  const renderJornada = () => (
    <View>
      <Text>Guia Eden Map</Text>
      <Text>
        Nossa jornada imersiva o coloca em um mundo virtual onde, diariamente,
        algo novo se apresenta para você.
      </Text>

      <GlassBox>
        <Text>Vídeos e aulas</Text>
        <Text>Meditações e visualizações</Text>
        <Text>Perguntas reflexivas</Text>
        <Text>Missões e conquistas</Text>
        <Text>Track de emoções</Text>
        <Text>Ressignifique seus medos</Text>
        <Text>Exercícios de gratidão</Text>
      </GlassBox>

      <ImgButton />

      <ButtonPrimary
        title="Continuar"
        onPress={() => setScreen(SCREENS.INTRODUCAO)}
      />
    </View>
  );

  const renderIntroducao = () => (
    <View>
      <Text>Guia Eden Map</Text>
      <Text>
        Nossa jornada imersiva o coloca em um mundo virtual onde, diariamente,
        algo novo se apresenta para você.
      </Text>

      <GlassBox>
        <Text>Introdução ao App</Text>
        <VideoPlayer />
      </GlassBox>

      <ButtonPrimary title="Continuar" onPress={onConfirm} />
    </View>
  );

  const renderContent = () => {
    if (screen === SCREENS.JORNADA) return renderJornada();
    if (screen === SCREENS.INTRODUCAO) return renderIntroducao();
    return renderDetail();
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX }],
        opacity
      }}
    >
      {renderContent()}
    </Animated.View>
  );
}
