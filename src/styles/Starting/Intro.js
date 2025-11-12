import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxs,
    },
    description: {
      marginTop: spacing.xxs,
      paddingTop: spacing.md,
      borderTopWidth: 3,
      borderTopColor: theme.fontColor,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      // textAlign: 'center',
      // lineHeight: verticalScale(22),
      marginBottom: spacing.md, 
      width: spacing.giant,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
      fontWeight: fontWeight.bold,
    },
    guideText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      lineHeight: verticalScale(22),
      marginTop: spacing.md,
      marginBottom: spacing.xs,
      width: spacing.giant,
    },
  });