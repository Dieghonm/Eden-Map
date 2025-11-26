import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { AppContext } from '../context/AppProvider';
import { createStyles } from '../styles/DayScreen';
import { SEMANAS, CALENDAR } from '../../assets/json/Semanas';
import ImgButton from '../components/ImgButton';
import ButtonPrimary from '../components/ButtonPrimary';
import { horizontalScale, verticalScale } from '../utils/responsive';
import CenaDay from './Days/CenaDay';
import VideoDay from './Days/VideoDay';
import MissaoDay from './Days/MissaoDay';
import TrakingDay from './Days/TrakingDay';
import PerguntasDay from './Days/PerguntasDay';
import MeditacaoScreen from './Days/MeditacaoScreen';

export default function DayScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { 
    semanaAtual,
    diaAtual,
    selectedPath,
  } = useContext(AppContext);
  
  const SEMANA = SEMANAS[semanaAtual - 1]
  const DIA = CALENDAR[diaAtual - 1]
  const [Screen, setScreen] = useState('');

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

  switch (Screen) {
    case 'DESCRICAOCENA':
      return <CenaDay path={selectedPath} semanaAtual={semanaAtual - 1} />

    case 'VIDEOS':
      return <VideoDay/>

    case 'MISSAO':
      return <MissaoDay/>

    case 'TRACKING':
      return <TrakingDay/>

    case 'PERGUNTAS':
      return <PerguntasDay/>

    case 'MEDITACAO':
      return <MeditacaoScreen/>

    default:
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
              onPress= {()=>{setScreen(DIA.exercicio)}}
              img={DIA.exercicio == 'PERGUNTAS'? [5, 6, 7, 8].includes(DIA)? 'ExpSombra': 'ExpLuz': DIA.exercicio}
            />
          : <View style={styles.spacer}/>}
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
}
