import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },
    iconContainer: {
      marginTop: spacing.xl,
      marginBottom: spacing.xs,
    },
    icon: {
      width: horizontalScale(60),
      height: verticalScale(60),
      tintColor: theme.accent,
    },
    textContainer: {
      width: spacing.giant,
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
    buttonsContainer: {
      width: spacing.giant,
      gap: spacing.xs,
      marginBottom: spacing.md,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.m,
      height: verticalScale(60),
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    iconCircle: {
      width: horizontalScale(40),
      height: horizontalScale(40),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonIcon: {
      width: horizontalScale(20),
      height: horizontalScale(20),
      tintColor: theme.fontColor,
    },
    starIcon: {
      fontSize: fontSize.xl,
    },
    yinYangIcon: {
      fontSize: fontSize.xl,
    },
    spiralIcon: {
      fontSize: fontSize.xl,
    },
    backButton: {
      width: spacing.giant,
      height: verticalScale(50),
      backgroundColor: theme.button,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius.m,
      marginTop: spacing.xs,
    },
    backButtonText: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
  });