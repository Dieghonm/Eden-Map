import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    gradientButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 290,
      height: 45,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
      color: theme.buttonTextColor,
    },
  });