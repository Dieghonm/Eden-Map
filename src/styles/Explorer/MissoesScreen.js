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
      marginTop: 10
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
    },
    missao: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignItems: 'center',
    },imageConcluida:{
      height:250,
      width:250,
    },
      navigation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      marginBottom: spacing.md,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
    },
    navButton: {
      width: horizontalScale(50),
      height: horizontalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    navIcon: {
      fontSize: fontSize.header,
      color: theme.fontColor,
    },
    navIconDisabled: {
      opacity: 0.3,
    },

  });