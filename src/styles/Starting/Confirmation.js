import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
    },
    headerContainer: {
      alignItems: 'flex-start',
      width: spacing.giant,
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.sm,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    sectionTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.sm,
      width: spacing.giant,
      textAlign: 'left',
    },
    featuresContainer: {
      width: spacing.giant,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      padding: spacing.sm,
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    checkIcon: {
      width: horizontalScale(20),
      height: horizontalScale(20),
      borderRadius: borderRadius.circle,
      backgroundColor: theme.success,
    },
    featureText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
    },
  });