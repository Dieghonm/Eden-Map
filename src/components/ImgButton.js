import { TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/ImgButton';

// ICONS
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
  disabled = false
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, height);

  const imageSource = {
    Checked,
    ExpBlock,
    VIDEOS: ExpVideos,
    MISSAO: ExpMissoes,
    ExpMeditacoes,
    TRACKING: ExpReflexoes,
    ExpSombra,
    ExpLuz,
    DESCRICAOCENA: ExpDescreva,
    ExpSentimentos
  }[img] || ExpBlock;

  return (
    <TouchableOpacity 
      style={[
        styles.buttonBox,
        disabled && styles.buttonDisabledBox
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>

      <Image
        source={imageSource}
        style={[
          styles.buttonIcon,
          disabled && styles.buttonDisabledIcon
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
