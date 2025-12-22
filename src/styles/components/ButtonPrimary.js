import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme, width = 220, height = 40) =>
  StyleSheet.create({
    gradientButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width ? horizontalScale(width) : spacing.giant,
      height: height ? verticalScale(height) : (spacing.lg - spacing.xxs),
      marginBottom: spacing.sm,
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