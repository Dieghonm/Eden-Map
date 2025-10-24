import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: 'Outfit_400Regular',
      color: theme.fontColor,
      textAlign: 'center',
    },
  });