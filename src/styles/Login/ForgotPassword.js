import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    // Container principal
    container: {
      alignItems: 'center',
    },

    // Espaçamento vertical
    space: {
      marginTop: spacing.xxs * 3,
    },

    // Container do InfoCard
    infoCardContainer: {
      marginBottom: spacing.sm,
    },

    TextView: {
      width: spacing.giant,
    },

    // === ESTILOS DE ERRO ===
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xxs * 2,
    },

    errorImg: {
      width: horizontalScale(14),
      height: horizontalScale(14),
      marginRight: horizontalScale(6),
    },

    errorText: {
      color: theme.fontColor,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      textAlign: 'center',
      marginLeft: spacing.xxs,
      marginBottom: spacing.xxs,
      marginTop: spacing.xxs,
    },

    // === ESTILOS DE LOADING ===
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
    },

    loadingText: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      marginTop: spacing.md,
    },

    // === ESTILOS DO CÓDIGO (4 DÍGITOS) ===
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
      marginVertical: spacing.xxs * 3,
    },

    codeInput: {
      width: horizontalScale(50),
      height: verticalScale(60),
      backgroundColor: theme.terciario,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
    },

    codeInputFilled: {
      borderColor: theme.accent,
    },
  });