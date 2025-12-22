// src/styles/DayScreen.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    // ========================================================================
    // TELA PRINCIPAL (exercícios do dia)
    // ========================================================================
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    gap:{
      gap: spacing.xs,

    },
    TextContainer: {
      alignItems: 'flex-start',
      gap: spacing.xxs,
    },
    Title: {
      color: theme.fontColor,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      height: spacing.md,
    },
    Text: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      height: spacing.lg,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    spacer: {
      height: spacing.xxl / 2
    },

    // ========================================================================
    // TELA DE ENTRADA
    // ========================================================================
    entradaContainer: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },

    // CABEÇALHO
    headerEntrada: {
      width: '100%',
      marginBottom: spacing.md,
    },
    diaText: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    faseTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    faseDescricao: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
    },

    // IMAGEM
    imageContainer: {
      width: horizontalScale(290),
      height: verticalScale(290),
      marginBottom: spacing.xs,
      overflow: 'hidden',
    },
    semanaImage: {
      width: '100%',
      height: '100%',
    },

    // BARRA DE PROGRESSO
    progressSection: {
      width: '100%',
      marginBottom: spacing.md,
    },
    progressPercentage: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xxs,
    },
    progressBarContainer: {
      width: '100%',
      alignItems: 'center',
    },
    progressBarBackground: {
      width: horizontalScale(290),
      height: verticalScale(8),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.p,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.success,
      borderRadius: borderRadius.p,
    },

  });