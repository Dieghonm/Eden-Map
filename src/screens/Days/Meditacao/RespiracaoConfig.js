// src/screens/Days/Meditacao/RespiracaoConfig.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/RespiracaoConfig';
import GlassBox from '../../../components/GlassBox';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecundary from '../../../components/ButtonSecundary';
import ImgButton from '../../../components/ImgButton';

export default function RespiracaoConfig({ onVoltar, onContinuar }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { salvarTempoRespiracao } = useJourney();

  const [atividadeIniciada, setAtividadeIniciada] = useState(false);
  const [respiracaoSelecionada, setRespiracaoSelecionada] = useState(null);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const handleIniciarAtividade = () => {
    setAtividadeIniciada(true);
  };

  const handleSelecionarRespiracao = async (tempo) => {
    setRespiracaoSelecionada(tempo);
    await salvarTempoRespiracao(tempo);
    setPodeAvancar(true);
  };

  const handleContinuar = () => {
    if (podeAvancar) {
      onContinuar();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Respiração pré prática</Text>

      <GlassBox>
        <Text style={styles.description}>
          <Text style={styles.highlight}>Antes de visualizar a meditação</Text>
          {' — dê atenção à respiração e '}
          <Text style={styles.highlight}>retorne para o estado corpo-mente.</Text>
        </Text>
      </GlassBox>

      <View style={styles.buttonsContainer}>
        {!atividadeIniciada ? (
          <ButtonPrimary
            title="Alterar"
            onPress={handleIniciarAtividade}
            height={40}
            disabled={false}
          />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Clique e escolha a intensidade</Text>

            {respiracaoSelecionada !== 5 ? (
              <ImgButton
                title="Leve - 3 minutos"
                img="ExpLuz"
                onPress={() => handleSelecionarRespiracao(5)}
              />
            ) : (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>✓ Leve - 3 minutos</Text>
              </View>
            )}

            {respiracaoSelecionada !== 15 ? (
              <ImgButton
                title="Intenso - 15 minutos"
                img="ExpSombra"
                onPress={() => handleSelecionarRespiracao(15)}
              />
            ) : (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>✓ Intenso - 15 minutos</Text>
              </View>
            )}
          </>
        )}

        <View style={styles.navigationButtons}>
          <ButtonSecundary
            title="Voltar"
            onPress={onVoltar}
            height={40}
          />

          <ButtonPrimary
            title="Ir para prática"
            onPress={handleContinuar}
            disabled={!podeAvancar}
            height={40}
          />
        </View>
      </View>
    </ScrollView>
  );
}