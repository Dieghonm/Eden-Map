// src/screens/Days/Meditacao/RelembrarCena.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useJourney } from '../../../context/JourneyProvider';
import { DESCRICAOCENA } from '../../../../assets/json/Semanas';
import { createStyles } from '../../../styles/Days/RelembrarCena';
import GlassBox from '../../../components/GlassBox';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecundary from '../../../components/ButtonSecundary';

export default function RelembrarCena({ selectedPath, semanaAtual, onVoltar, onContinuar }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { buscarCenasSemana } = useJourney();

  const [cenaSalva, setCenaSalva] = useState(null);
  const [currentCena, setCurrentCena] = useState(1);

  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const data = DESCRICAOCENA[pathKey]?.[semanaAtual - 1];

  useEffect(() => {
    const cenas = buscarCenasSemana(semanaAtual, selectedPath);
    if (cenas) {
      setCenaSalva(cenas);
    }
  }, [semanaAtual, selectedPath, buscarCenasSemana]);

  if (!cenaSalva || !cenaSalva.cenas || cenaSalva.cenas.length === 0) {
    return (
      <View style={styles.container}>
        <GlassBox>
          <Text style={styles.errorText}>
            Nenhuma cena foi encontrada para esta semana.
          </Text>
        </GlassBox>
        <ButtonSecundary
          title="Voltar"
          onPress={onVoltar}
          height={40}
        />
      </View>
    );
  }

  const totalCenas = cenaSalva.cenas.length;
  const cenaAtual = cenaSalva.cenas[currentCena - 1];
  const cenaKey = `Cena ${currentCena}`;
  const textoCena = data?.[cenaKey] || '';

  const handleNext = () => {
    if (currentCena < totalCenas) {
      setCurrentCena(currentCena + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCena > 1) {
      setCurrentCena(currentCena - 1);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.cenaCount}>
        Cena <Text style={styles.highlight}>{currentCena}</Text>/{totalCenas}
      </Text>

      <GlassBox>
        <Text style={styles.cenaTitle}>{textoCena}</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.cenaPart}>Onde se passou sua cena?</Text>
          <Text style={styles.input}>{cenaAtual.onde}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.cenaPart}>Quem estava ao seu redor?</Text>
          <Text style={styles.input}>{cenaAtual.quem}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.cenaPart}>Qual era o contexto ou ação?</Text>
          <Text style={[styles.input, styles.inputGrande]}>{cenaAtual.acao}</Text>
        </View>
      </GlassBox>
      {currentCena < totalCenas ? 
        <ButtonPrimary
          title="Próxima Cena"
          onPress={handleNext}
          height={40}
        />:
        <ButtonPrimary
          title="Continuar"
          onPress={onContinuar}
          height={40}
        />
      }
    </ScrollView>
  );
}