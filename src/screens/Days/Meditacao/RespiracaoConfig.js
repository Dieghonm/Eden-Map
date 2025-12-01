import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { createStyles } from '../../../styles/Days/RespiracaoConfig';

import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecundary from '../../../components/ButtonSecundary';
import ImgButton from '../../../components/ImgButton';

import ExpBlock from '../../../../assets/icons/ExpBlock.png';
import Checked from '../../../../assets/icons/Checked.png';

export default function RespiracaoConfig({ onVoltar, onContinuar }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { salvarTempoRespiracao } = useJourney();

  const [atividadeIniciada, setAtividadeIniciada] = useState(false);
  const [respiracaoSelecionada, setRespiracaoSelecionada] = useState(null);
  const [podeAvancar, setPodeAvancar] = useState(true);

  const handleIniciarAtividade = () => {
    const novoValor = !atividadeIniciada;
    setAtividadeIniciada(novoValor);

    if (!novoValor) {
      setRespiracaoSelecionada(null);
      setPodeAvancar(true);
    } else {
      setPodeAvancar(false);
    }
  };

  const handleSelecionarRespiracao = async (tempo) => {
    setRespiracaoSelecionada(tempo);
    await salvarTempoRespiracao(tempo);
    setPodeAvancar(true);
  };

  const handleContinuar = () => {
    if (podeAvancar) onContinuar();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Respiração pré prática</Text>

      <Text style={styles.description}>
        <Text style={styles.highlight}>Sugerimos</Text>
        {' começar com '}
        <Text style={styles.highlight}>o exercício de respiração</Text>
        {' — ele prepara o corpo e a mente para '}
        <Text style={styles.highlight}>meditar com mais leveza</Text>
        {'.'}
      </Text>

      <TouchableOpacity onPress={handleIniciarAtividade} style={styles.toggleBox}>
        {atividadeIniciada ? (
          <View style={styles.imagebox}>
            <Text style={styles.toggleText}>Desativar</Text>
            <Image source={Checked} style={[styles.image, styles.ativate]} resizeMode="cover" />

          </View>
        ) : (
          <View style={styles.imagebox}>
            <Image source={ExpBlock} style={[styles.image, styles.desativate]} resizeMode="cover" />
            <Text style={styles.toggleText}>Ativar</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Clique e escolha a intensidade</Text>

      <View style={styles.navigationButtons}>

        <ImgButton
          title="Leve - 3 minutos"
          img={respiracaoSelecionada === 3 ? 'Checked' : 'ExpLuz'}
          disabled={!atividadeIniciada}
          onPress={() => handleSelecionarRespiracao(3)}
        />
        <ImgButton
          title="Intenso - 15 minutos"
          img={respiracaoSelecionada === 15 ? 'Checked' : 'ExpSombra'}
          disabled={!atividadeIniciada}
          onPress={() => handleSelecionarRespiracao(15)}
        />
        <ButtonPrimary
          title="Ir para prática"
          onPress={handleContinuar}
          disabled={!podeAvancar}
          height={40}
        />
      </View>

      <ButtonSecundary
        title="Voltar"
        onPress={onVoltar}
        height={40}
      />
    </ScrollView>
  );
}
