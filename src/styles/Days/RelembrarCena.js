// src/styles/Days/RelembrarCena.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    cenaCount: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
    },
    highlight: {
      color: theme.alert,
    },
    cenaTitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      padding: spacing.xxs,
      textAlign: 'left',
    },
    respostaGroup: {
      width: '100%',
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.xxs,
    },
    respostaLabel: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs / 2,
    },
    respostaText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      backgroundColor: theme.terciario,
      padding: spacing.xs,
      borderRadius: spacing.xxs,
      lineHeight: spacing.xs - spacing.xxs,
    },
    errorText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.warning,
      textAlign: 'center',
      padding: spacing.md,
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: spacing.xs,
      marginTop: spacing.md,
    },
    mainButtonsContainer: {
      width: '100%',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
  });