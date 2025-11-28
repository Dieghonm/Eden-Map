import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.xs,
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
      textAlign: 'center',
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    semanaImage: {
      width: horizontalScale(290),
      height: verticalScale(200),
      borderRadius: borderRadius.m,
      marginBottom: spacing.md,
    },
    perguntaCard: {
      width: '100%',
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    perguntaTexto: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      textAlign: 'center',
    },
    respostasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: spacing.md,
      gap: spacing.xs,
    },
    respostaButton: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.m,
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'transparent',
    },
    respostaSelecionada: {
      borderColor: theme.accent,
      transform: [{ scale: 1.05 }],
    },
    respostaNegativa: {
      // Opcional: adicionar cor específica
    },
    respostaNeutra: {
      // Opcional: adicionar cor específica
    },
    respostaPositiva: {
      // Opcional: adicionar cor específica
    },
    respostaEmoji: {
      fontSize: fontSize.header,
      marginBottom: spacing.xxs,
    },
    respostaLabel: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    errorText: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.warning,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });