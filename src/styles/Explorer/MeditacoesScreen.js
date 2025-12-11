import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      paddingBottom: spacing.md,
      marginTop: spacing.sm
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginBottom: spacing.xs
    },
    text:{
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginBottom: spacing.xs
    },
    pathButton: {
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      height: spacing.lg + spacing.md / 2,
      width: spacing.giant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pathText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    spacing:{
      height: spacing.lg
    },
    tema:{
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      marginTop: spacing.xxs
    },
    imageConcluida:{
      width: spacing.huge + spacing.md,
      height: spacing.huge + spacing.md,
      marginBottom: spacing.md
    },
    navigation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      marginBottom: spacing.xs,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
      paddingHorizontal: spacing.xs
    },
    navButton: {
      width: horizontalScale(50),
      height: horizontalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xxs
    },
    counter:{
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignItems: 'center',
      marginHorizontal: spacing.xs
    },
    navIcon: {
      fontSize: fontSize.header,
      color: theme.fontColor,
    },
    navIconDisabled: {
      opacity: 0.3,
    },


  });