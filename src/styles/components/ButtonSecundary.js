import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme, width = 290, height = 45) =>
  StyleSheet.create({
    button: {
      width: width,
      height: height,
      backgroundColor: theme.secundaryButton,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
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
      fontFamily: fontFamily.b7,
      color: theme.secundaryButtonText || theme.fontColor,
    },
  });