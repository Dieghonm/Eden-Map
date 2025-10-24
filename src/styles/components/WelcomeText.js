import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },
    title: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
    },
  });