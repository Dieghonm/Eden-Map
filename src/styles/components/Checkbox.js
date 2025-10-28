import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: spacing.giant,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg - 2*spacing.xxs,
      paddingVertical: spacing.xs
    },
    checkbox: {
      width: spacing.xs - spacing.xxs,
      height: spacing.xs - spacing.xxs,
      borderRadius: borderRadius.circle,
      backgroundColor: theme.fontColor,
      marginRight: horizontalScale(20),
    },
    checkboxChecked: {
      backgroundColor: theme.button,
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: verticalScale(16),
    },
    linkalert: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline',
      fontSize: fontSize.md,
    },
    linkwarning: {
      color: theme.warning,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline',
      fontSize: fontSize.md,
    },
  });