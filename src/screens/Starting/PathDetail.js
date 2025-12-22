// src/screens/Starting/PathDetail.js - COMPLETO
import React, { useContext, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/PathDetail';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import VideoPlayer from '../../components/VideoPlayer';
import { api } from '../../services/api';
import HeaderAjuster from '../../components/HeaderAjuster';

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

  if (!pathData) return null;

  // ========================================================================
  // HANDLER: Confirmar caminho e salvar progresso
  // ========================================================================
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

  // ========================================================================
  // HELPER: Renderizar descrição com highlights
  // ========================================================================
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

  // ========================================================================
  // TELA 1: DETAIL - Descrição do caminho
  // ========================================================================
  const renderDetail = () => (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeaderAjuster />
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
    </ScrollView>
  );

  // ========================================================================
  // TELA 2: JORNADA - Recursos do app
  // ========================================================================
  const renderJornada = () => (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeaderAjuster />
      <Text style={styles.jornadaTitle}>Guia Eden Map</Text>
      
      <Text style={styles.text}>
        Nossa <Text style={styles.highlight}>jornada imersiva</Text> o coloca em um mundo virtual onde, {' '}
        <Text style={styles.highlight}>diariamente</Text>, algo <Text style={styles.highlight}>novo</Text> se apresenta para você.
      </Text>

      <Text style={styles.jornadaSubtitle}>
        Transforme seu subconsciente através dos nossos:
      </Text>
      <GlassBox>
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Vídeos e aulas</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Meditações e visualizações</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Perguntas reflexivas</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Missões e conquistas</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Track de emoções</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Ressignifique seus medos</Text>
          </View>

          <View style={styles.featureRow}>
            <Image
              source={require('../../../assets/icons/Checked.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>Exercícios de gratidão</Text>
          </View>
        </View>
      </GlassBox>

      <ButtonPrimary
        title="Continuar"
        onPress={() => setScreen(SCREENS.INTRODUCAO)}
      />
    </ScrollView>
  );

  // ========================================================================
  // TELA 3: INTRODUÇÃO - Vídeo tutorial
  // ========================================================================
  const renderIntroducao = () => (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeaderAjuster />
      <Text style={styles.jornadaTitle}>Guia Eden Map</Text>
      
      <Text style={styles.text}>
        Nossa <Text style={styles.highlight}>jornada imersiva</Text> o coloca em um mundo virtual onde, {' '}
        <Text style={styles.highlight}>diariamente</Text>, algo <Text style={styles.highlight}>novo</Text> se apresenta para você.
      </Text>
      <Text style={styles.introducaoTitle}>
        Transforme seu subconsciente.{'\n'}
        Descubra como:
      </Text>

      <View style={styles.separator} />
      <Text style={styles.time}>Duração: 5 minutos</Text>
      <View style={styles.separator} />

      <GlassBox style={styles.videoSection}>
        <Text style={styles.videoLabel}>Introdução ao App</Text>
        <View>

          <VideoPlayer
            videoId="dQw4w9WgXcQ"
            height={165}
            width={260}
          />
        </View>
      </GlassBox>

      <ButtonPrimary 
        title="Ir para home" 
        onPress={onConfirm} 
      />
    </ScrollView>
  );

  // ========================================================================
  // RENDERIZAÇÃO CONDICIONAL
  // ========================================================================
  if (screen === SCREENS.JORNADA) return renderJornada();
  if (screen === SCREENS.INTRODUCAO) return renderIntroducao();
  return renderDetail();
}