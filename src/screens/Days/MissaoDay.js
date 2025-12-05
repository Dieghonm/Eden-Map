import React, { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeProvider";
import { createStyles } from "../../styles/Days/MissaoDay";
import { useApp } from '../../context/AppProvider';
import { MISSAO } from '../../../assets/json/Semanas';
import ButtonPrimary from "../../components/ButtonPrimary";
import GlassBox from "../../components/GlassBox";
import ButtonSecundary from "../../components/ButtonSecundary";

export default function MissaoDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const index = Math.floor((Number(semanaAtual) - 1) / 2);
  const missaoObj = MISSAO[pathKey]?.[index];
  const temMissao = missaoObj?.["Missão"];
  const [isconcluida, setisconcluida] = useState(false);
  const [Insight, setInsight] = useState(false);
  const totalEstrelas = missaoObj?.estrelas ?? 0;

  console.log(missaoObj);
  

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
          <Text style={styles.title}>{missaoObj["Titulo"]}</Text>
          {missaoObj.img && (
            <Image 
              source={{ uri: missaoObj.img }} 
              style={styles.image}
              resizeMode="cover"
            />
          )}
          
          <Image style={styles.lockImage} source={require("../../../assets/Lock.png")} />
          <Text style={styles.missaoTexto}>{missaoObj["Missão"]}</Text>
        </GlassBox>
        
        <ButtonPrimary 
          title='Iniciar missão'
          onPress={() => onComplete && onComplete(true)}
        />
      </SafeAreaView>
    );
  }

  if (isconcluida){
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Parabéns!</Text>
        <Text style={styles.errorText}>Parabéns! Você desbloqueou o emblema da missão.</Text>
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
        <Image 
          source={{ uri: missaoObj.img }} 
          style={styles.image}
          resizeMode="cover"
        />
        <ButtonPrimary 
          title='Proxima'
          onPress={() => {setInsight(!Insight)}}
        />
        <ButtonSecundary 
          title='Voltar'
          onPress={() => setisconcluida(!isconcluida)}
        />
      </SafeAreaView>
    );
  }

  if(Insight){

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Insight</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>Timer</Text>
      <ButtonPrimary 
        title='Voltar'
        onPress={() => {onComplete(false)}}
      />
    </SafeAreaView>
  );
}