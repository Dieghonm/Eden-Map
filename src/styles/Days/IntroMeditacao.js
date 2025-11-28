// src/styles/Days/IntroMeditacao.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    imageContainer: {
      marginBottom: spacing.md,
    },
    title: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    pergunta: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      padding: spacing.xs,
      lineHeight: spacing.xs,
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.md,
    },
  });