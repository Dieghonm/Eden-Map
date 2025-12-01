// src/styles/Days/RespiracaoConfig.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      marginBottom: spacing.xs / 2,
    },
    description: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'left',
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    imagebox:{
      width:spacing.huge,
      height: spacing.xxl / 2,
      backgroundColor: theme.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: borderRadius.p,
      marginBottom: spacing.md
    },
    image:{
      height:50,
      width:50,
      margin: spacing.md / 4,
      borderRadius: borderRadius.p
    },
    ativate: {
      backgroundColor: '#38C197',
    }, 
    desativate:{
      backgroundColor: '#EA5959',
    },
    toggleText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginHorizontal: spacing.xs * 2
    },
    sectionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
      marginBottom: spacing.md
    },
    navigationButtons: {
      gap: spacing.md,
    },
  });