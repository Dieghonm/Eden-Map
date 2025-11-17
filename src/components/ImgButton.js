import { TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ImgButton';

import ExpMeditacoes from '../../assets/icons/ExpMeditacoes.png';
import ExpMissoes from '../../assets/icons/ExpMissoes.png';
import ExpReflexoes from '../../assets/icons/ExpReflexoes.png';
import ExpVideos from '../../assets/icons/ExpVideos.png';

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
    case 'ExpMeditacoes':
      imageSource = ExpMeditacoes;
      break;
    case 'ExpMissoes':
      imageSource = ExpMissoes;
      break;
    case 'ExpReflexoes':
      imageSource = ExpReflexoes;
      break;
    case 'ExpVideos':
      imageSource = ExpVideos;
      break;
    default:
      imageSource = ExpMeditacoes;
      break;
  }

  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        source={imageSource}
        style={styles.buttonIcon}
        resizeMode="contain"  // ← Como prop
      />
    </TouchableOpacity>
  );
}
