import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    headerContainer: {
      marginTop: spacing.md * 2,
      marginBottom: spacing.xs,
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
    },
    highlight: {
      color: theme.alert,

    },
    sectionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      width: spacing.giant,
      textAlign: 'left',
    },
    resultButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      width: spacing.giant,
      height: spacing.lg + spacing.md / 2,
      borderRadius: borderRadius.p,
      borderWidth: 2,
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.md
    },
    percentage: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      marginRight: spacing.xs * 2
    },
    resultName: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
  });