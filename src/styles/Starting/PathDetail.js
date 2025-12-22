// src/styles/Starting/PathDetail.js - COMPLETO
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale, horizontalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    // ========================================================================
    // TELA 1: DETAIL (já existente)
    // ========================================================================
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xs + spacing.lg,
    },
    headerContainer: {
      alignItems: 'flex-start',
      width: spacing.giant,
      marginBottom: spacing.sm,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
    mediaContainer: {
      width: spacing.giant,
      height: spacing.giant,
      alignItems: 'center',
      borderRadius: borderRadius.m,
      marginBottom: spacing.sm,
    },
    image: {
      height: spacing.giant,
      width: spacing.giant,
    },

    // ========================================================================
    // TELA 2: JORNADA (nova)
    // ========================================================================
    jornadaTitle: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      textAlign: 'left',
      width: spacing.giant,
    },
    jornadaSubtitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.xs,
      width: spacing.giant,
    },
    text:{
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.xs,
      width: spacing.giant,
    },
    
    featuresContainer: {
      width: spacing.giant,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs * 2
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
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

    // ========================================================================
    // TELA 3: INTRODUÇÃO (nova)
    // ========================================================================
    introducaoTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
      textAlign: 'left',
      width: spacing.giant,
    },
    introducaoDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.sm,
      width: spacing.giant,
    },
    
    // Linha separadora amarela
    separator: {
      height: 2,
      width: spacing.giant,
      backgroundColor: theme.alert,
      marginBottom: spacing.xs / 2,
    },
    
    // Container do vídeo
    videoSection: {
      width: spacing.giant,
      marginBottom: spacing.sm,
    },
    time: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs / 2,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    videoLabel: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
  });