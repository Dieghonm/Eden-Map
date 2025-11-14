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
      marginTop:spacing.xs * 6,
      backgroundColor: theme.background,
      paddingTop:spacing.md,
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
    subtitle: {
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,
    //   color: theme.fontColor,
    // //   marginBottom: spacing.xs,
    // //   textAlign: 'center',
    },
    
    // Botões da tela inicial
    optionButton: {
      width: spacing.huge,
      // height: spacing.lg,
      backgroundColor: theme.background,
      borderRadius: borderRadius.p,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
      borderWidth: 2,
      paddingVertical: 20
      
    },
    optionText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: 26,
    },

    // // Inputs do desejo
    inputContainer: {
      width: spacing.huge + spacing.md,
    //   marginBottom: spacing.xs,
    },
    label: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.xxs *2,
    },
    input: {
    //   width: '100%',
    //   minHeight: verticalScale(40),
      backgroundColor: theme.terciario,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs *2,
      marginBottom: spacing.xs,
    },
    textArea: {
      minHeight: spacing.xxl,
    },
    teste: {
      marginBottom:spacing.xs

    },

  });