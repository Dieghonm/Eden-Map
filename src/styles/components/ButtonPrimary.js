import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../theme/texts';


export const createStyles = (theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.button,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    buttonDisabled: {
      backgroundColor: theme.placeholder,
      opacity: 0.5,
    },
    buttonText: {
      color: '#e61d1dff',
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
    },
  });