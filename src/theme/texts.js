import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { horizontalScale, verticalScale, moderateScale } from '../utils/responsive';

// Hook de carregamento das fontes
export const useOutfitFonts = () => {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });
  return fontsLoaded;
};

// Função auxiliar para escalar com limite máximo
const scaleMinMax = (size) => {
  return Math.min(Math.min(horizontalScale(size), verticalScale(size)), size * 2);
};

// Espaçamento — baseado na largura da tela
export const spacing = {
  xxs: scaleMinMax(5), 
  xs: scaleMinMax(20), 
  sm: scaleMinMax(30), 
  md: scaleMinMax(40), 
  lg: scaleMinMax(50), 
  xl: scaleMinMax(90), 
  xxl: scaleMinMax(130),
  xxxl: scaleMinMax(200),
  huge: horizontalScale(220), 
  giant: horizontalScale(290), 
};


// Bordas — escala proporcional
export const borderRadius = {
  p: horizontalScale(10),
  m: horizontalScale(15),
  x: horizontalScale(20),
  circle: horizontalScale(100),
};

// Fontes
export const fontFamily = {
  r4: 'Outfit_400Regular',
  b7: 'Outfit_700Bold',
};

// Peso das fontes
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// Tamanhos de fonte
export const fontSize = {
  xs: moderateScale(12),
  sm: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  title: moderateScale(28),
  header: moderateScale(32),
};

// Dimensões comuns de componentes
export const componentSizes = {
  buttonWidth: horizontalScale(290),
  buttonHeight: verticalScale(45),
  inputWidth: horizontalScale(215),
  inputHeight: verticalScale(40),
  iconSize: horizontalScale(24),
};


export { horizontalScale as scale, verticalScale, moderateScale };