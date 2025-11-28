// src/styles/Days/RespiracaoConfig.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    description: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      padding: spacing.xs,
      lineHeight: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
      gap: spacing.md,
      marginTop: spacing.md,
    },
    sectionTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginTop: spacing.xs,
    },
    selectedContainer: {
      width: spacing.giant,
      height: spacing.lg - spacing.xxs,
      backgroundColor: theme.success,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xs,
    },
    selectedText: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },
    navigationButtons: {
      flexDirection: 'column',
      width: '100%',
      gap: spacing.xs,
      marginTop: spacing.md,
    },
  });