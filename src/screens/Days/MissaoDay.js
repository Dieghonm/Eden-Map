import React, { useState } from "react";
import { Image, SafeAreaView, Text, View, TextInput } from "react-native";
import { useTheme } from "../../context/ThemeProvider";
import { createStyles } from "../../styles/Days/MissaoDay";
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { MISSAO } from '../../../assets/json/Semanas';
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecundary from "../../components/ButtonSecundary";
import GlassBox from "../../components/GlassBox";
import ImgButton from "../../components/ImgButton";

export default function MissaoDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  const { salvarMissaoConcluida } = useJourney();
  
  const [tela, setTela] = useState('TIMER'); // 'TIMER', 'CONCLUIDA', 'INSIGHT'
  const [insightText, setInsightText] = useState('');

  // ============================================================================
  // DADOS DA MISSÃO
  // ============================================================================
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const index = Math.floor((Number(semanaAtual) - 1) / 2);
  const missaoObj = MISSAO[pathKey]?.[index];
  const totalEstrelas = missaoObj?.estrelas ?? 0;



  // ============================================================================
  // TELA ÍMPAR - APRESENTAÇÃO (NÃO MEXER)
  // ============================================================================
  if (Number(semanaAtual) % 2 !== 0) {
    return (
      <SafeAreaView style={styles.container}>
        <GlassBox>
          <View style={styles.starsView}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                source={
                  index < totalEstrelas
                    ? require("../../../assets/StarOn.png")
                    : require("../../../assets/StarOff.png")
                }
                style={styles.stars}
              />
            ))}
          </View>
          
          <Text style={styles.title}>{missaoObj?.Titulo}</Text>
          
          <View style={{ position: 'relative' }}>
            {missaoObj?.img && (
              <Image 
                source={{ uri: missaoObj.img }} 
                style={styles.image}
                resizeMode="cover"
              />
            )}
            <Image 
              style={styles.lockImage} 
              source={require("../../../assets/Lock.png")} 
            />
          </View>
          
          <Text style={styles.missaoTexto}>{missaoObj?.["Missão"]}</Text>
        </GlassBox>
        
        <ButtonPrimary 
          title='Desligue para conectar'
          onPress={() => onComplete && onComplete(true)}
        />
      </SafeAreaView>
    );
  }

  // ============================================================================
  // TELA 1 - TIMER (INSIGHT SOBRE A MISSÃO)
  // ============================================================================
  if (tela === 'TIMER') {
    return (
      <SafeAreaView style={styles.container}>
        <GlassBox>
          {/* <Text style={styles.timer}>00:00:00</Text> */}
          
          {/* <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View> */}
          
          <View style={styles.starsView}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                source={
                  index < totalEstrelas
                    ? require("../../../assets/StarOn.png")
                    : require("../../../assets/StarOff.png")
                }
                style={styles.stars}
              />
            ))}
          </View>
          
          <Text style={styles.subtitle}>{missaoObj?.["Titulo"]}</Text>
          <Text style={styles.textoDescricao}>{missaoObj?.["Missão"]}</Text>
        </GlassBox>

        <ImgButton 
          title='Concluí a missão'
          onPress={() => setTela('CONCLUIDA')}
          img={'Checked'}
          
        />
        
        <ImgButton 
          title='Falhei na missão'
          onPress={() => setTela('INSIGHT')}
          img={''}
        />
        
        <ButtonPrimary 
          title='Voltar'
          onPress={() => onComplete(false)}
        />
      </SafeAreaView>
    );
  }

  // ============================================================================
  // TELA 2 - MISSÃO CONCLUÍDA
  // ============================================================================
  if (tela === 'CONCLUIDA') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textoTopo}>Missão concluída</Text>
        
        <View style={styles.imageContainer}>
          {missaoObj?.img && (
            <Image 
              source={{ uri: missaoObj.img }} 
              style={styles.imageConcluida}
              resizeMode="cover"
            />
          )}
        </View>

        <GlassBox style={styles.glassConcluida}>
          <Text style={styles.parabens}>Parabéns!</Text>
          <Text style={styles.textoParabens}>
            Parabéns! Você desbloqueou o emblema da missão.
          </Text>
        </GlassBox>

        <View style={styles.dimensoesBox}>
          <Text style={styles.dimensoesText}>290 x 40</Text>
        </View>

        <ButtonPrimary 
          title='Próximo'
          onPress={() => setTela('INSIGHT')}
        />
        
        <ButtonSecundary 
          title='Voltar'
          onPress={() => setTela('TIMER')}
        />
      </SafeAreaView>
    );
  }

  // ============================================================================
  // TELA 3 - INSIGHT DA MISSÃO
  // ============================================================================
  if (tela === 'INSIGHT') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textoTopo}>Insight da missão</Text>
        
        <GlassBox>
          <Text style={styles.pergunta}>Como foi sua experiência com a missão?</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Descreva as 3 experiências"
            placeholderTextColor={theme.fontColor}
            value={insightText}
            onChangeText={setInsightText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </GlassBox>

        <ButtonPrimary 
          title='Concluir'
          onPress={async () => {
            await salvarMissaoConcluida(semanaAtual, selectedPath, {
              missaoId: missaoObj?.id || `${pathKey}_${index}`,
              titulo: missaoObj?.Titulo,
              estrelas: totalEstrelas,
              insight: insightText,
              concluidaEm: new Date().toISOString()
            });
            onComplete(true);
          }}
        />
        
        <ButtonSecundary 
          title='Voltar'
          onPress={() => setTela('CONCLUIDA')}
        />
      </SafeAreaView>
    );
  }
}