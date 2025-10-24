import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    gradientButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 290,
      height: 45,
      margin: 15
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },
  });