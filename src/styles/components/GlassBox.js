import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.buttonWidth,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    glassGradient: {
      padding: horizontalScale(7),
      borderRadius: borderRadius.xl,
      alignItems: 'center',
    },
  });