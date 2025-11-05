import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      alignItems: 'center',
    },

    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },

    infoCardContainer: {
      marginBottom: spacing.md,
    },

    space: {
      marginTop: spacing.xxs * 3,
    },

    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xxs * 2,
    },

    errorText: {
      color: theme.warning || theme.fontColor,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      textAlign: 'center',
      marginLeft: spacing.xxs,
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

    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
      marginVertical: spacing.xxs * 3,
    },

    codeInput: {
      width: horizontalScale(40),
      height: verticalScale(50),
      backgroundColor: theme.terciario,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      borderRadius: borderRadius.md,
    },

    codeInputFilled: {
      // exemplo: backgroundColor: theme.secondary,
    },

    resendContainer: {
      width: spacing.giant,
      marginTop: spacing.xs,
    },
  });