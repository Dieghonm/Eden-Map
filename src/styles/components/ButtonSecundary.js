import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    button: {
      width: 290,
      height: 45,
      backgroundColor: theme.secundaryButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
      color: theme.secundaryButtonText || theme.fontColor,
    },
  });