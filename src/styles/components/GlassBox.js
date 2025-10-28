import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { spacing, borderRadius, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.buttonWidth,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    glassGradient: {
      padding: scale(7),
      borderRadius: borderRadius.xl,
      alignItems: 'center',
    },
  });