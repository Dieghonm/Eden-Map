import React, { useState, useRef, useEffect } from "react";
import { Image, View, Text, TextInput, Animated, StyleSheet } from "react-native";
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
  
  const [tela, setTela] = useState('TIMER');
  const [insightText, setInsightText] = useState('');
  const [missaoConcluida, setMissaoConcluida] = useState(null);

  const lockOpacity = useRef(new Animated.Value(1)).current;
  const imageOverlayOpacity = useRef(new Animated.Value(0.5)).current;

  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const index = Math.floor((Number(semanaAtual) - 1) / 2) * 2;
  const missaoObj = MISSAO[pathKey]?.[index];
  const totalEstrelas = missaoObj?.estrelas ?? 0;

  const animarConclusao = () => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(lockOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
        Animated.timing(imageOverlayOpacity, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ]).start();
  };

  useEffect(() => {
    if (tela === 'CONCLUIDA') {
      lockOpacity.setValue(1);
      imageOverlayOpacity.setValue(0.5);
      animarConclusao();
    }
  }, [tela]);

  if (Number(semanaAtual) % 2 !== 0) {
    return (
      <View style={styles.container}>
        <GlassBox>
          <View style={styles.starsView}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Image
                key={idx}
                source={idx < totalEstrelas ? require("../../../assets/StarOn.png") : require("../../../assets/StarOff.png")}
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
      </View>
    );
  }

  if (tela === 'TIMER') {
    return (
      <View style={[styles.container, styles.timerSize]}>
        <GlassBox>
          <View style={styles.starsView}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Image
                key={idx}
                source={idx < totalEstrelas ? require("../../../assets/StarOn.png") : require("../../../assets/StarOff.png")}
                style={styles.stars}
              />
            ))}
          </View>
          <View style={styles.box}>
            <Text style={styles.subtitle}>{missaoObj?.["Titulo"]}</Text>
            <Text style={styles.textoDescricao}>{missaoObj?.["Missão"]}</Text>
          </View>
        </GlassBox>

        <ImgButton 
          title='Concluí a missão'
          onPress={() => {
            setMissaoConcluida(true);
            setTela('CONCLUIDA');
          }}
          img={'Checked'}
        />

        <View style={styles.imgButton}>
          <ImgButton 
            title='Falhei na missão'
            onPress={() => {
              setMissaoConcluida(false);
              setTela('INSIGHT');
            }}
            img={''}
          />
        </View>

        <ButtonPrimary 
          title='Voltar'
          onPress={() => onComplete(false)}
        />
      </View>
    );
  }

  if (tela === 'CONCLUIDA') {
    return (
      <View style={[styles.container, styles.conclSize]}>
        <Text style={styles.parabens}>Parabéns!</Text>
        <Text style={styles.textoParabens}>Parabéns! Você desbloqueou o emblema da missão.</Text>

        <View style={styles.imageContainer}>
          {missaoObj?.img && (
            <View style={styles.imageWrapper}>
              <Animated.Image 
                source={{ uri: missaoObj.img }} 
                style={[styles.imageConcluida, { opacity: imageOverlayOpacity }]}
                resizeMode="cover"
              />
            </View>
          )}

          <Animated.Image 
            source={require("../../../assets/Lock.png")}
            style={[styles.lockImage, { opacity: lockOpacity }]}
          />
        </View>

        <ButtonPrimary 
          title='Próximo'
          onPress={() => setTela('INSIGHT')}
        />
        
        <ButtonSecundary 
          title='Voltar'
          onPress={() => setTela('TIMER')}
        />
      </View>
    );
  }

  if (tela === 'INSIGHT') {
    return (
      <View style={[styles.container, styles.insightSize]}>
        <GlassBox>
          <Text style={styles.pergunta}>Como foi sua experiência com a missão?</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Máximo 360 caracteres"
            placeholderTextColor={theme.fontColor}
            value={insightText}
            onChangeText={setInsightText}
            multiline
            textAlignVertical="top"
            maxLength={360}
          />
        </GlassBox>

        <ButtonPrimary 
          title='Concluir'
          onPress={async () => {
            await salvarMissaoConcluida(semanaAtual, selectedPath, {
              missaoId: missaoObj?.id || `${pathKey}_${index}`,
              titulo: missaoObj?.Titulo,
              estrelas: totalEstrelas,
              concluida: missaoConcluida,
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
      </View>
    );
  }

  return null;
}
