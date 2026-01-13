import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      alignItems: 'center',
    },
    modalBox: {
      marginTop: spacing.xs * 4,
      backgroundColor: theme.background,
      paddingTop: spacing.xs,
      borderRadius: borderRadius.p,
      width: spacing.giant,
      alignItems: 'center',
    },
    modalContent: {
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.xs,
    },
    
    // Botões da tela inicial
    optionButton: {
      width: spacing.huge,
      backgroundColor: theme.background,
      borderRadius: borderRadius.p,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
      borderWidth: 2,
      paddingVertical: 20
    },
    optionText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: 26,
    },

    // Inputs do desejo
    inputContainer: {
      width: spacing.huge + spacing.sm,
    },
    label: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.xxs * 2,
    },
    input: {
      backgroundColor: theme.terciario,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs * 2,
      marginBottom: spacing.xs,
    },
    textArea: {
      minHeight: spacing.xxl,
    },
    teste: {
      marginBottom: spacing.xs
    },

    // Estilos para Feelings
    feelingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    feelingRow: {
      flexDirection: 'row',
      backgroundColor: theme.fontColor,
      width: spacing.xxl + spacing.sm,
      height: spacing.xs * 2,
      borderRadius: borderRadius.circle,
      padding: spacing.xxs * 1.5,
      paddingLeft: spacing.xs,
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: spacing.xxs * 2
    },
    feelingText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.background,
      textAlign: 'center',
    },
    checkCircle: {
      width: horizontalScale(30),
      height: horizontalScale(30),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playIcon: {
      width: horizontalScale(40),
      height: horizontalScale(40),
    },
    spacer: {
      height: spacing.xs
    },
    scrollContent: {
      alignItems: 'center',
    },
  });