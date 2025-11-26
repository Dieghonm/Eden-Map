import React, { useContext, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { AppContext } from '../context/AppProvider';
import { createStyles } from '../styles/DayScreen';
import { SEMANAS, CALENDAR } from '../../assets/json/Semanas';
import ImgButton from '../components/ImgButton';
import ButtonPrimary from '../components/ButtonPrimary';
import { horizontalScale, verticalScale } from '../utils/responsive';

export default function DayScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const { 
    semanaAtual,
    diaAtual,
    progressoAtualizadoEm,
    avancarDia,
    sincronizarProgressoComBackend,
    isLoading 
  } = useContext(AppContext);

  const SEMANA = SEMANAS[semanaAtual - 1]
  const DIA = CALENDAR[diaAtual - 1]

  const buttonText = () =>{
    switch (DIA.exercicio) {
      case 'DESCRICAOCENA':
        return 'Descreva a Cena'

      case 'VIDEOS':
        return 'Vídeo'

      case 'MISSAO':
        return 'Missão'

      case 'TRACKING':
        return 'Reflexões'

      case 'PERGUNTAS':
        if ([5, 6, 7, 8].includes(DIA)) {
          return 'Pergunta: Sombra'
        }
        return 'Pergunta: Luz'
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TextContainer}>
        <Text style={styles.Title}>{SEMANA.nome}</Text>
        <Text style={styles.Text}>
          <Text style={styles.highlight}>{'Conclua'}</Text>
            {' as atividades e '}
          <Text style={styles.highlight}>{'avance'}</Text>
            {' para o próximo dia'}
        </Text>
        <Image source={SEMANA.img} style={{ width: horizontalScale(290), height: verticalScale(290) }}/>

      </View>

      {DIA.exercicio !== ''?
        <ImgButton 
          title={buttonText()} 
          onPress= {()=>{console.log('dentro')}}
          img={DIA.exercicio == 'PERGUNTAS'? [5, 6, 7, 8].includes(DIA)? 'ExpSombra': 'ExpLuz': DIA.exercicio}
        />
      : <></>}
      {false ? 
        <ImgButton 
          title={'Meditação'} 
          onPress= {()=>{console.log('dentro')}}
          img={'ExpMeditacoes'}
        />
        :
        <ImgButton 
          title={'Bloqueado'} 
          onPress= {()=>{console.log('dentro')}}
          img={''}
        />
      }

      <ButtonPrimary 
        title={'Concluir o dia'} 
        onPress= {()=>{console.log('dentro')}}
        disabled={true}
        height = {40}
      />
        
    </SafeAreaView>
  );
}
