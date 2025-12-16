import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: spacing.md,
      marginTop: spacing.xxl,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
      width: spacing.giant,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.md,
      textAlign: 'center',
      lineHeight: spacing.xs,
      width: spacing.giant,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    chartContainer: {
      alignItems: 'center',
      width: '100%',
    },
    barsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: verticalScale(100),
    },
    barWrapper: {
      width: horizontalScale(80),
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    bar: {
      width: horizontalScale(50),
    },
    separator: {
      width: spacing.huge + spacing.xs,
      height: 5,
      backgroundColor: theme.fontColor,
      marginBottom: spacing.xs,
    },
    iconsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: spacing.xs / 2,
      gap: spacing.xxs,
    },
    iconBox: {
      width: horizontalScale(75),
      height: verticalScale(60),
      borderRadius: borderRadius.m,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    labelsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    barLabel: {
      width: horizontalScale(80),
      textAlign: 'center',
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
  });
