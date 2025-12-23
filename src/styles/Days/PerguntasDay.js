import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    perguntaTexto: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginTop: spacing.xl + spacing.xxs,
      marginBottom: spacing.sm,
      alignSelf: 'flex-start',
      width: '100%'
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    labelResposta: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs / 2,
      textAlign: 'left',
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.xxs
    },
    input: {
      height: spacing.giant,
      width: spacing.xxxl + spacing.lg,
      backgroundColor: theme.terciario,
      color: theme.fontColor,
      fontSize: fontSize.ms,
      fontFamily: fontFamily.r4,
      padding: spacing.xs / 2,
      textAlignVertical: 'top',
      marginBottom: spacing.xxs
    },
    helperText: {
      fontSize: fontSize.xs,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      opacity: 0.7,
      textAlign: 'center',
      marginBottom: spacing.xxs
    },
  });