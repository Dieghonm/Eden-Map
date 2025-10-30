import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    space: {
      marginTop: spacing.xxs * 3,
    },
    errorText: {
      color: theme.warning,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      textAlign: 'center',
      marginBottom: spacing.xxs,
      marginTop: spacing.xxs,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
    },
    loadingText: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      marginTop: spacing.sm,
    },
    TextREGISTER: {
      width: Math.min(spacing.giant, 440),
    },
    TextFORGOT: {
      width: spacing.xxxl,
    }
  });