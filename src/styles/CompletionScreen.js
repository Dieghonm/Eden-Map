// src/styles/CompletionScreen.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.sm,
      alignItems: 'center',
    },

    // ========================================================================
    // CABEÇALHO
    // ========================================================================
    header: {
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    congratsTitle: {
      fontSize: fontSize.header,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
      textAlign: 'center',
    },
    congratsSubtitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      lineHeight: spacing.xs,
    },

    // ========================================================================
    // IMAGEM
    // ========================================================================
    imageContainer: {
      width: horizontalScale(290),
      height: verticalScale(290),
      marginBottom: spacing.sm,
      borderRadius: borderRadius.m,
      overflow: 'hidden',
    },
    pathImage: {
      width: '100%',
      height: '100%',
    },

    // ========================================================================
    // SEÇÕES
    // ========================================================================
    sectionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
    },

    // ========================================================================
    // INFO ROWS
    // ========================================================================
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
      paddingVertical: spacing.xxs,
    },
    label: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
    },
    value: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    // ========================================================================
    // ESTATÍSTICAS
    // ========================================================================
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    statItem: {
      width: '30%',
      alignItems: 'center',
      backgroundColor: theme.terciario,
      padding: spacing.xs,
      borderRadius: borderRadius.m,
    },
    statNumber: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.success,
      marginBottom: spacing.xxs,
    },
    statLabel: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
    },

    // ========================================================================
    // BALANÇO EMOCIONAL
    // ========================================================================
    emotionBar: {
      flexDirection: 'row',
      width: '100%',
      height: spacing.sm,
      borderRadius: borderRadius.m,
      overflow: 'hidden',
      marginBottom: spacing.xs,
    },
    emotionSegment: {
      height: '100%',
    },
    emotionLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    emotionLabel: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    // ========================================================================
    // MENSAGEM FINAL
    // ========================================================================
    finalMessage: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      lineHeight: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },

    // ========================================================================
    // FOOTER
    // ========================================================================
    footer: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      marginTop: spacing.sm,
      opacity: 0.7,
    },
  });