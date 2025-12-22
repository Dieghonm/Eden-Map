import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md * 3,
    },
    introText: {
      paddingTop: spacing.xxs,
      paddingHorizontal: spacing.xs + spacing.xxs,
    },
    stepsHeaderContainer: {
      marginTop: spacing.lg,
      marginHorizontal: spacing.lg,
      width: spacing.giant,
      alignSelf: 'center',
    },
    title: {
      color: theme.fontColor,
      fontFamily: fontFamily.b7,
      fontSize: fontSize.xxl,
      marginEnd: spacing.xxs,
    },
    text: {
      color: theme.fontColor,
      fontFamily: fontFamily.r4,
      fontSize: fontSize.md,
      height: spacing.sm * 2
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      fontSize: fontSize.md,
    },
    progressContainer: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginVertical: spacing.xs + spacing.xxs,
      width: spacing.giant,
      justifyContent: 'center',
    },
    progressBar: {
      flex: 1,
      height: verticalScale(4),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.p,
    },
    progressActive: {
      backgroundColor: theme.success,
    },
  })