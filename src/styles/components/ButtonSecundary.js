import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    button: {
      width: width ? scale(width) : componentSizes.buttonWidth,
      height: height ? verticalScale(height) : componentSizes.buttonHeight,
      backgroundColor: theme.secundaryButton,
      alignItems: 'center',
      justifyContent: 'center',
      margin: spacing.md,
      borderRadius: borderRadius.lg,
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