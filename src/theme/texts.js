import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// Hook de carregamento das fontes
export const useOutfitFonts = () => {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });
  return fontsLoaded;
};

// Espaçamento — baseado na largura da tela
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(30),
  xxl: scale(48),
};

// Bordas — escala proporcional
export const borderRadius = {
  m: scale(10),
  g: scale(20),
};

// Fontes
export const fontFamily = {
  r4: 'Outfit_400Regular',
  b7: 'Outfit_700Bold',
};

// Peso das fontes (não precisa escalar)
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

// Tamanhos de fonte — ajusta suavemente à tela
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
