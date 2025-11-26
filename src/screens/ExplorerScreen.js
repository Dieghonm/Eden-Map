import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/ExplorerScreen';
import ImgButton from '../components/ImgButton';
import ButtonPrimary from '../components/ButtonPrimary';

export default function ExplorerScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = (option) => {
    switch(option) {
      case 'Vídeos':
        navigation.navigate('Videos');
        break;
      case 'Missões':
        navigation.navigate('Missoes');
        break;
      case 'Meditações':
        navigation.navigate('Meditacoes');
        break;
      case 'Reflexões':
        navigation.navigate('Reflexoes');
        break;
      default:
        console.log('❌ Opção não encontrada:', option);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>      
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore livremente o Eden</Text>
        <Text style={styles.subtitle}>
          Aqui você poderá acompanhar o <Text style={styles.highlight}>seu progresso</Text>, 
          e até mesmo acessar conteúdo de <Text style={styles.highlight}>outros caminhos</Text>.
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <ImgButton 
          title="Vídeos"
          onPress={() => handlePress('Vídeos')}
          img="VIDEOS"
        />
        <ImgButton 
          title="Missões"
          onPress={() => handlePress('Missões')} 
          img="MISSAO"
        />
        <ImgButton 
          title="Meditações"
          onPress={() => handlePress('Meditações')} 
          img="ExpMeditacoes"
        />
        <ImgButton 
          title="Reflexões"
          onPress={() => handlePress('Reflexões')} 
          img="ExpReflexoes"
        />          
      </View>

      <ButtonPrimary 
        onPress={() => navigation.goBack()}
        title="Voltar"
      />
    </SafeAreaView>
  );
}