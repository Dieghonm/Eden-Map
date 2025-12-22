// src/styles/Days/IntroMeditacao.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl + spacing.xxs * 2,
    },
    imageContainer: {
      marginBottom: spacing.sm * 2,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'justify',
      marginBottom: spacing.xxs,
    },
    pergunta: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.alert,
      textAlign: 'justify',
      lineHeight: spacing.xs,
      height: spacing.xl
    },

  });