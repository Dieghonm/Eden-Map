import { TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ImgButton';

import Checked from '../../assets/icons/Checked.png';
import ExpBlock from '../../assets/icons/ExpBlock.png';
import ExpVideos from '../../assets/icons/ExpVideos.png';
import ExpMissoes from '../../assets/icons/ExpMissoes.png';
import ExpMeditacoes from '../../assets/icons/ExpMeditacoes.png';
import ExpReflexoes from '../../assets/icons/ExpReflexoes.png';
import ExpSombra from '../../assets/icons/ExpSombra.png';
import ExpLuz from '../../assets/icons/ExpLuz.png';
import ExpDescreva from '../../assets/icons/ExpDescreva.png';
import ExpSentimentos from '../../assets/icons/ExpSentimentos.png';


export default function ImgButton({ 
  title, 
  onPress, 
  width = 290,
  height = 65,
  img,
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  let imageSource;

  switch (img) {
    case 'Checked':
      imageSource = Checked;
      break;

    case 'ExpBlock':
      imageSource = ExpBlock;
      break;

    case 'VIDEOS':
      imageSource = ExpVideos;
      break;

    case 'MISSAO':
      imageSource = ExpMissoes;
      break;

    case 'ExpMeditacoes':
      imageSource = ExpMeditacoes;
      break;

    case 'TRACKING':
      imageSource = ExpReflexoes;
      break;

    case 'ExpSombra':
      imageSource = ExpSombra;
      break;

    case 'ExpLuz':
      imageSource = ExpLuz;
      break;

    case 'DESCRICAOCENA':
      imageSource = ExpDescreva;
      break;

    case 'ExpSentimentos':
      imageSource = ExpSentimentos;
      break;

    default:
      imageSource = ExpBlock;
      break;
  }

  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        source={imageSource}
        style={styles.buttonIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

