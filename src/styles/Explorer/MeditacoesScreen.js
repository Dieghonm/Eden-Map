// src/styles/Explorer/MeditacoesScreen.js - VERSÃO COMPLETA
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    // ============================================================================
    // CONTAINER PRINCIPAL
    // ============================================================================
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      paddingBottom: spacing.md,
      marginTop: spacing.sm
    },

    // ============================================================================
    // TELA 1 - SELEÇÃO DE CAMINHO
    // ============================================================================
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginBottom: spacing.xs
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginBottom: spacing.xs
    },
    pathButton: {
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      height: spacing.lg + spacing.md / 2,
      width: spacing.giant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pathText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    // ============================================================================
    // TELA 2 - SELEÇÃO DE MEDITAÇÃO
    // ============================================================================
    spacing: {
      height: spacing.lg
    },
    tema: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      marginTop: spacing.xxs
    },
    imageContainer: {
      marginBottom: spacing.md,
      alignItems: 'center'
    },
    imageConcluida: {
      width: spacing.huge + spacing.md,
      height: spacing.huge + spacing.md,
      borderRadius: borderRadius.m
    },
    navigation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      marginBottom: spacing.xs,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
      paddingHorizontal: spacing.xs
    },
    navButton: {
      width: horizontalScale(50),
      height: horizontalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xxs
    },
    counter: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignItems: 'center',
      marginHorizontal: spacing.xs
    },
    navIcon: {
      fontSize: fontSize.header,
      color: theme.fontColor,
    },
    navIconDisabled: {
      opacity: 0.3,
    },

    // ============================================================================
    // TELA 3 - PLAYER DE MEDITAÇÃO (estilos do PlayerMeditacao)
    // ============================================================================
    spacerBox: {
      marginTop: spacing.huge + spacing.md,
      height: spacing.xxl
    },
    playerText: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      textAlign: 'left'
    },
    timerBox: {
      width: '100%'
    },
    progress: {
      width: '100%',
      height: spacing.xxs,
      backgroundColor: 'white',
      borderRadius: 4,
      overflow: 'hidden'
    },
    marcador: {
      height: spacing.xxs,
      backgroundColor: theme.success
    },
    icon: {
      width: spacing.xs,
      height: spacing.xs,
      borderRadius: borderRadius.m,
      backgroundColor: theme.success,
      position: 'absolute',
      top: -7
    },
    timerRow: {
      marginVertical: spacing.xs,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    timerText: {
      fontSize: spacing.xs * 2,
      fontWeight: '700',
      color: 'white'
    },
    playButton: {
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center'
    },
    playIcon: {
      width: spacing.lg,
      height: spacing.lg,
    }
  });