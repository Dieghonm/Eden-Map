import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';
import { horizontalScale } from '../../utils/responsive';

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
      paddingVertical: spacing.sm,
    },
    loadingText: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
    },
    TextREGISTER: {
      width: Math.min(spacing.giant, 440),
    },
    TextFORGOT: {
      width: spacing.xxxl,
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xxs,
    },
    errorImg: {
      width: horizontalScale(14),
      height: horizontalScale(14),
      marginRight: horizontalScale(6),
    },
    errorText: {
      color: theme.fontColor,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      textAlign: 'center',
    },
  });