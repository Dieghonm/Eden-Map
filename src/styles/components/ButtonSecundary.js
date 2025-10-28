import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme, width = 290, height = 45) =>
  StyleSheet.create({
    button: {
      width: width ? horizontalScale(width) : spacing.giant,
      height: height ? verticalScale(height) : (spacing.lg - spacing.xxs),
      backgroundColor: theme.secundaryButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.secundaryButtonText || theme.fontColor,
    },
  });