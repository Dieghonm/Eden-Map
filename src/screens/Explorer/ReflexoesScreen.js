import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { useJourney } from '../../context/JourneyProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import ButtonSecundary from '../../components/ButtonSecundary';
import ImgButton from '../../components/ImgButton';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { trackingRespostas = {} } = useJourney();
  const [respostasScreen, setrespostasScreen] = useState (false);

  const values = [
    trackingRespostas.triste ?? 0.01,
    trackingRespostas.neutro ?? 0.01,
    trackingRespostas.feliz ?? 0.01
  ];

  const changeScreen =(screen) => {
    console.log(screen);
    
  }
  
  const barColors = [
    theme.warning,
    theme.alert,
    theme.success,
  ];

  const total = values.reduce((a, b) => a + b, 0) || 1;
  const maxBarHeight = 100;

  if (respostasScreen == 'respostas') {
    return(
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <GlassBox>
            
          </GlassBox>


          <ButtonPrimary 
            title="Voltar"
            onPress={() => setrespostasScreen(!respostasScreen)}
          />

        </ScrollView>
      </SafeAreaView>
      
    )
  }

  if (respostasScreen == 'cenas') {
    return(
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <GlassBox>
            
          </GlassBox>


          <ButtonPrimary 
            title="Voltar"
            onPress={() => setrespostasScreen(!respostasScreen)}
          />

        </ScrollView>
      </SafeAreaView>
      
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Como você se sentiu durante a sua jornada?
        </Text>

        <GlassBox>
          <View style={styles.chartContainer}>
            <View style={styles.barsRow}>
              {values.map((value, index) => {
                const height = (value / total) * maxBarHeight;

                return (
                  <View key={index} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor: barColors[index],
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.separator} />
            <View style={styles.iconsRow}>
              <View style={styles.iconBox}>
                <Image 
                  source={require("../../../assets/icons/Triste.png")} 
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.iconBox}>
                <Image 
                  source={require("../../../assets/icons/Neutro.png")} 
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.iconBox}>
                <Image 
                  source={require("../../../assets/icons/Feliz.png")} 
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.labelsRow}>
              {values.map((value, index) => {
                const percentage = Math.round((value / total) * 100);

                return (
                  <Text key={index} style={styles.barLabel}>
                    {percentage}%
                  </Text>
                );
              })}
            </View>
          </View>
        </GlassBox>

        <Text style={styles.subtitle}>
          Quanto
          <Text style={styles.highlight}> mais positivo </Text>
          for esse balanço, mais fácil se torna,
          <Text style={styles.highlight}> atrair seu desejo</Text>.
        </Text>
        <View style={styles.spacer}>
          <ImgButton title={'Descrição de cena'} img={'DESCRICAOCENA'} onPress={()=>setrespostasScreen('cenas')}/>
          <ImgButton title={'Suas respostas'} img={'ExpLuz'} onPress={()=>setrespostasScreen('respostas')}/>
          <ButtonPrimary
            title="Voltar"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
