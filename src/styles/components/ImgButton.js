import { StyleSheet } from 'react-native';
import { borderRadius, spacing, fontSize, fontFamily } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme, width, height ) =>
  StyleSheet.create({
    buttonBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
      paddingLeft: spacing.sm,
      paddingRight: spacing.xs / 3,
      padding: spacing.xxs,
      width: width ? horizontalScale(width) : spacing.giant,
      height: height ? verticalScale(height) : (spacing.lg - spacing.xxs),
    },

    buttonDisabledBox: {
      opacity: 0.4,
    },

    buttonText: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    buttonIcon: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: spacing.lg,
    },

    buttonDisabledIcon: {
      opacity: 0.6,
    },
  });

