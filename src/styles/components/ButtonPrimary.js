import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    gradientButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width ? scale(width) : componentSizes.buttonWidth,
      height: height ? verticalScale(height) : componentSizes.buttonHeight,
      margin: spacing.md,
      borderRadius: borderRadius.lg,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },
  });