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
      marginTop: spacing.xl - spacing.xs,
    },
    starsView: {
      flexDirection: "row",
      marginBottom: spacing.xs,
      justifyContent: 'center',
    },
    stars: {
      width: spacing.md, 
      height: spacing.md, 
      marginRight: spacing.xxs * 2,
      marginTop: spacing.xxs * 2
    },
    caminho: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignItems: 'center',
    },
    titulo: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignItems: 'center',
      marginBottom: spacing.xs / 2
    },
    lockImage: {
      position: "absolute",
      top: "48%",
      left: "50%",
      transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    missao: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignItems: 'center',
      marginVertical: spacing.xs,
      height: spacing.xs * 4
    },
    imageConcluida:{
      height: spacing.huge + spacing.md,
      width: spacing.huge + spacing.md,
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