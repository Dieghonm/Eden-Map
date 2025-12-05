// src/styles/Days/MissaoDay.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      paddingTop: spacing.xxl,
    },
    starsView:{
      flexDirection: "row",
      marginBottom: spacing.xs,
    },
    stars:{
      width: spacing.md, 
      height: spacing.md, 
      marginRight: spacing.xxs * 2,
    },
    title:{
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
    lockImage:{
        position: "absolute",
        top: "48%",
        left: "50%",
        transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    missaoTexto:{
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },

    // // ============================================================================
    // // TÍTULOS E TEXTOS
    // // ============================================================================
    // titulo: {

    // },
    // missaoBox: {
    //   backgroundColor: theme.terciario,
    //   padding: spacing.xs,
    //   borderRadius: borderRadius.p,
    //   marginBottom: spacing.md,
    // },
    // missaoLabel: {
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   marginBottom: spacing.xxs,
    // },
    // missaoTexto: {
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,
    //   color: theme.fontColor,
    //   lineHeight: spacing.xs,
    //   textAlign: 'center',
    // },
    // instrucao: {
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,
    //   color: theme.fontColor,
    //   lineHeight: spacing.xs,
    //   textAlign: 'center',
    // },
    // highlight: {
    //   color: theme.alert,
    //   fontFamily: fontFamily.b7,
    // },

    // // ============================================================================
    // // CRONÔMETRO (ETAPA INSIGHT)
    // // ============================================================================
    // cronometroContainer: {
    //   width: '100%',
    //   marginBottom: spacing.md,
    //   alignItems: 'center',
    // },
    // cronometro: {
    //   fontSize: fontSize.header,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   marginBottom: spacing.xs,
    // },
    // progressBar: {
    //   width: '100%',
    //   height: verticalScale(8),
    //   backgroundColor: theme.terciario,
    //   borderRadius: borderRadius.p,
    //   overflow: 'hidden',
    // },
    // progressFill: {
    //   height: '100%',
    //   width: '60%', // Animado dinamicamente se necessário
    //   backgroundColor: theme.success,
    //   borderRadius: borderRadius.p,
    // },

    // // ============================================================================
    // // BOTÕES DE AÇÃO (CONCLUIR/FALHAR)
    // // ============================================================================
    // botoesContainer: {
    //   width: '100%',
    //   gap: spacing.md,
    //   marginBottom: spacing.md,
    // },
    // botaoAcao: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   padding: spacing.md,
    //   borderRadius: borderRadius.m,
    //   gap: spacing.xs,
    // },
    // botaoConcluir: {
    //   backgroundColor: theme.success,
    // },
    // botaoFalhar: {
    //   backgroundColor: theme.warning,
    // },
    // botaoIcon: {
    //   width: horizontalScale(30),
    //   height: horizontalScale(30),
    // },
    // botaoTexto: {
    //   fontSize: fontSize.lg,
    //   fontFamily: fontFamily.b7,
    //   color: '#FFFFFF',
    // },

    // // ============================================================================
    // // CONCLUSÃO
    // // ============================================================================
    // parabens: {
    //   fontSize: fontSize.header,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   textAlign: 'center',
    //   marginBottom: spacing.xs,
    // },
    // mensagemConclusao: {
    //   fontSize: fontSize.lg,
    //   fontFamily: fontFamily.r4,
    //   color: theme.fontColor,
    //   textAlign: 'center',
    //   lineHeight: spacing.xs,
    //   marginBottom: spacing.md,
    // },

    // // ============================================================================
    // // FEEDBACK
    // // ============================================================================
    // feedbackContainer: {
    //   width: '100%',
    // },
    // feedbackLabel: {
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   marginBottom: spacing.xs,
    // },
    // feedbackInput: {
    //   minHeight: verticalScale(150),
    //   backgroundColor: theme.terciario,
    //   color: theme.fontColor,
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,
    //   padding: spacing.xs,
    //   borderRadius: borderRadius.p,
    //   textAlignVertical: 'top',
    // },
  });