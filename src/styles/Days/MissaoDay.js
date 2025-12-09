// src/styles/Days/MissaoDay.js
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
      paddingTop: spacing.xxl,
    },

    // ============================================================================
    // TELA ÍMPAR - APRESENTAÇÃO
    // ============================================================================
    starsView: {
      flexDirection: "row",
      marginBottom: spacing.xs,
      justifyContent: 'center',
    },
    stars: {
      width: spacing.md, 
      height: spacing.md, 
      marginRight: spacing.xxs * 2,
    },
    title: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    image: {
      width: horizontalScale(220),
      height: verticalScale(220),
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      opacity: 0.5,
    },
    lockImage: {
      position: "absolute",
      top: "48%",
      left: "50%",
      transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    missaoTexto: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },

    // ============================================================================
    // TELA 1 - TIMER
    // ============================================================================
    // textoTopo: {
    //   fontSize: fontSize.xl,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   marginBottom: spacing.md,
    //   textAlign: 'left',
    //   width: spacing.giant,
    // },
    // timer: {
    //   fontSize: fontSize.header * 1.2,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   textAlign: 'center',
    //   marginBottom: spacing.xs,
    // },
    // progressBar: {
    //   width: '100%',
    //   height: verticalScale(8),
    //   backgroundColor: theme.terciario,
    //   borderRadius: borderRadius.p,
    //   marginBottom: spacing.md,
    //   overflow: 'hidden',
    // },
    // progressFill: {
    //   height: '100%',
    //   backgroundColor: theme.success,
    //   borderRadius: borderRadius.p,
    // },
    subtitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginBottom: spacing.xxs,
    },
    textoDescricao: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.xs,
    },

    // ============================================================================
    // TELA 2 - MISSÃO CONCLUÍDA
    // ============================================================================
    imageContainer: {
      marginBottom: spacing.md,
    },
    imageConcluida: {
      width: horizontalScale(220),
      height: verticalScale(220),
      borderRadius: borderRadius.m,
    },
    glassConcluida: {
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    parabens: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    textoParabens: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      lineHeight: spacing.xs,
    },
    dimensoesBox: {
      width: horizontalScale(290),
      height: verticalScale(40),
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
      borderWidth: 2,
      borderColor: theme.button,
      borderStyle: 'dashed',
    },
    dimensoesText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    // ============================================================================
    // TELA 3 - INSIGHT
    // ============================================================================
    pergunta: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    input: {
      width: '100%',
      minHeight: verticalScale(150),
      backgroundColor: theme.terciario,
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      padding: spacing.xs,
      borderRadius: borderRadius.p,
      textAlignVertical: 'top',
      marginBottom: spacing.xs,
    },
  });