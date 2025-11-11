import { StyleSheet } from 'react-native';
import { borderRadius, spacing, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    playBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondary,
      width: spacing.giant,
      height: spacing.lg + spacing.xxs * 3,
      borderRadius: borderRadius.circle,
      paddingLeft: spacing.md,
      padding: spacing.xxs * 2,
      marginVertical: spacing.xxs,
    },
    text: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    iconWrapper: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
    },
    svgWrapper: {
      position: 'absolute',
      top: 1,
      left: 1,
    },
  });
