import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
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
      textAlign: 'center',
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
    perguntaCard: {
      width: '100%',
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    perguntaTexto: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      lineHeight: spacing.xs + spacing.xxs,
      textAlign: 'center',
    },
    respostaCard: {
      width: '100%',
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    labelResposta: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
    },
    input: {
      minHeight: verticalScale(200),
      maxHeight: verticalScale(300),
      backgroundColor: theme.terciario,
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      padding: spacing.xs,
      borderRadius: borderRadius.p,
      marginBottom: spacing.xs,
      textAlignVertical: 'top',
    },
    helperText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      opacity: 0.7,
      textAlign: 'center',
    },
    errorText: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.warning,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });