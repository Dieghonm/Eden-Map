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
  xxs: scale(5),
  xs: scale(10),
  sm: scale(20),
  md: scale(40),
  lg: scale(80),
  xl: scale(90), //topo da tela
  xxl: scale(130),
  xxxl: scale(160),
  huge: scale(220),
  giant: scale(290),
};

// Bordas — escala proporcional (CORRIGIDO)
export const borderRadius = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(28),
  circle: scale(50), // Para elementos circulares
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

// Dimensões comuns de componentes (ADICIONADO)
export const componentSizes = {
  buttonWidth: scale(290),
  buttonHeight: verticalScale(45),
  inputWidth: scale(215),
  inputHeight: verticalScale(40),
  checkboxSize: scale(15),
  checkboxWidth: scale(290),
  checkboxHeight: verticalScale(80),
  iconSize: scale(24),
};
