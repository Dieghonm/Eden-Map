import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Days/TrakingDay';
import { useApp } from '../../context/AppProvider';
import { useJourney } from '../../context/JourneyProvider';
import { TRACKING } from '../../../assets/json/Semanas';
import { Image, View, Text, Pressable } from "react-native";
import GlassBox from "../../components/GlassBox";
import { LOGINGIF } from "../../../assets/json/Imagens";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState } from "react";

export default function TrakingDay({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { selectedPath, semanaAtual, diaAtual } = useApp();
  const { salvarTrackingResposta } = useJourney();

  const traking = TRACKING[selectedPath][semanaAtual - 1];

  const [selected, setSelected] = useState(null); 
  
  function handlePress(reacao) {
    setSelected(reacao);
  }

  function concluir() {
    if (!selected) return;
    let respostaFinal = selected;

    if (traking.Tipo === "sombra") {
      if (selected === "feliz") respostaFinal = "triste";
      else if (selected === "triste") respostaFinal = "feliz";
    }

    salvarTrackingResposta(respostaFinal);
    setSelected(null);
    if (onComplete) onComplete(true);
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: LOGINGIF }} 
        style={styles.gif}
      />

      <Text style={styles.texto}>{traking.texto}</Text>

      <GlassBox>
        <Text style={styles.quest}>Essa frase é verdadeira?</Text>

        <View style={styles.respostasContainer}>
          
          {/* FELIZ */}
          <Pressable style={[styles.iconeWrapper,selected === "feliz" && styles.borderSelected]} onPress={() => handlePress("feliz")}>
            <Image 
              source={require("../../../assets/icons/DobCheck.png")}
              style={styles.iconeFeliz}
            />
          </Pressable>

          {/* NEUTRO */}
          <Pressable style={[styles.iconeWrapper,selected === "neutro" && styles.borderSelected]} onPress={() => handlePress("neutro")}>
            <Image 
              source={require("../../../assets/icons/Neutral.png")}
              style={styles.iconeNeutro}
            />
          </Pressable>

          {/* TRISTE */}
          <Pressable style={[styles.iconeWrapper,selected === "triste" && styles.borderSelected]} onPress={() => handlePress("triste")}>
            <Image 
              source={require("../../../assets/icons/DobUnCheck.png")}
              style={styles.iconeTriste}
            />
          </Pressable>

        </View>
      </GlassBox>

      <ButtonPrimary 
        title={'Concluir'} 
        onPress={concluir} 
        disabled={!selected}
      />

    </View>
  );
}
