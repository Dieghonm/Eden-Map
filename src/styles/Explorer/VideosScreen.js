// src/styles/Explorer/VideosScreen.js - LIMPO
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';
import { horizontalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: spacing.giant,
      marginHorizontal: spacing.md * 2,
      marginTop: spacing.xl + spacing.xs,
    },
    videoTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      alignSelf: 'flex-start',
      height: spacing.sm,
    },
    videoDescription: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      height: spacing.xs * 5
    },
    videoDuration: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.alert,
      marginBottom: spacing.xs,
    },    
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
  });