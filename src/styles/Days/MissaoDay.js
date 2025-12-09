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
      marginTop: 10
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
    timerSize:{
      marginTop:spacing.xxxl - spacing.xs
    },
    
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
    box:{
      height:150
    },
    subtitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      // textAlign: 'left',
      // alignSelf: 'flex-start',
      marginBottom: spacing.xs,
    },
    textoDescricao: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
    },
    imgButton:{
      marginVertical:spacing.md
    },

    // ============================================================================
    // TELA 2 - MISSÃO CONCLUÍDA
    // ============================================================================
    conclSize:{
      marginTop:spacing.xxl - spacing.xxs
    },
    imageContainer: {
      margin: spacing.md,
    },
    imageConcluida: {
      width: spacing.giant,
      height: spacing.giant,
      borderRadius: borderRadius.p,
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
      alignSelf: 'flex-start',
      marginLeft: spacing.lg
    },
    textoParabens: {
      width:220,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      lineHeight: spacing.xs,
      marginLeft: spacing.lg
    },
    // ============================================================================
    // TELA 3 - INSIGHT
    // ============================================================================
    insightSize: {
      marginTop: spacing.xxxl - spacing.sm
    },
    pergunta: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
      padding: spacing.xxs
    },
    input: {
      width: '100%',
      minHeight: spacing.giant - spacing.xs,
      backgroundColor: theme.terciario,
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      padding: spacing.xs,
      textAlignVertical: 'top',
      marginBottom: spacing.xs,
    },
  });