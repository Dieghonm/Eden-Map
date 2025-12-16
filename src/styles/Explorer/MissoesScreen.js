// src/styles/Explorer/MissoesScreen.js - LIMPO
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily } from '../../theme/texts';
import { horizontalScale } from '../../utils/responsive';

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
  });