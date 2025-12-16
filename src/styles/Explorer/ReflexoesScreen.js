// src/styles/Explorer/ReflexoesScreen.js - LIMPO
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: spacing.md,
      marginTop: spacing.lg,
    },
    scrollContentResposta: {
      alignItems: 'center',
      paddingBottom: spacing.md,
      marginTop: spacing.xxl,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
      width: spacing.giant,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      textAlign: 'center',
      lineHeight: spacing.xs,
      width: spacing.giant,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    spacer:{
      rowGap: 20
    },
    respostaData:{
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginVertical: 10,
    },
    respostaAcao:{
      height: spacing.xxxl,
    },
    
    // ============================================================================
    // GRÁFICO DE BARRAS
    // ============================================================================
    chartContainer: {
      alignItems: 'center',
      width: '100%',
    },
    barsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: verticalScale(100),
    },
    barWrapper: {
      width: horizontalScale(80),
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    bar: {
      width: horizontalScale(50),
    },
    separator: {
      width: spacing.huge + spacing.xs,
      height: spacing.xxs,
      backgroundColor: theme.fontColor,
      marginBottom: spacing.xs,
    },
    iconsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: spacing.xs / 2,
      gap: spacing.xxs,
    },
    iconBox: {
      width: horizontalScale(75),
      height: verticalScale(60),
      borderRadius: borderRadius.m,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    barLabel: {
      width: horizontalScale(80),
      textAlign: 'center',
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    // ============================================================================
    // TELA DE CENAS
    // ============================================================================
    data:{
      textAlign: 'center',
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    cena:{
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      minHeight:spacing.huge / 2
    },
    pergunta:{
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      // alignSelf: 'flex-start',
      marginBottom: spacing.xxs,
      paddingHorizontal: spacing.xxs,
    },
    resposta: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      backgroundColor: theme.terciario,
      width: spacing.huge + spacing.md,
      height: spacing.sm,
      paddingVertical: spacing.xxs * 2,
      paddingHorizontal: spacing.xxs * 2,
      marginBottom: spacing.xs,
    },
    acao:{
      height: spacing.xxl,
    },
  });
