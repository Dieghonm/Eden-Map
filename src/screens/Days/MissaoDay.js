import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeProvider";
import { createStyles } from "../../styles/Days/MissaoDay";
import { useApp } from '../../context/AppProvider';
import { MISSAO } from '../../../assets/json/Semanas';
import ButtonPrimary from "../../components/ButtonPrimary";
import GlassBox from "../../components/GlassBox";

export default function MissaoDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual } = useApp();
  
  const pathKey = selectedPath === 'Atenção Plena' ? 'Atencao_Plena' : selectedPath;
  const missaoObj = MISSAO[pathKey]?.[semanaAtual - 1];
  const temMissao = missaoObj?.["Missão"];
  const totalEstrelas = missaoObj?.estrelas ?? 0;

  if (temMissao) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>Não tem missão</Text>
    </SafeAreaView>
  );
}