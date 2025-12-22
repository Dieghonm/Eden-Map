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
      marginHorizontal: spacing.sm * 2,
      marginTop: spacing.lg,
    },
    videoTitle: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      alignSelf: 'flex-start',
      height: spacing.md * 2,
      paddingVertical: spacing.xxs * 2
    },
    videoDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      height: spacing.xs * 5
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
    videoDuration: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    linha:{
      backgroundColor: theme.alert,
      width:260,
      height:2

    } 
  });