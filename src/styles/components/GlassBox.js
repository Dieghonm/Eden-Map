import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: spacing.giant,
      marginBottom:  spacing.sm
    },
    containerDisabled: {
      opacity: 0.5,
    },
    glassGradient: {
      paddingTop: spacing.xs - spacing.xxs,
      paddingHorizontal: spacing.xs - spacing.xxs,
      borderRadius: borderRadius.p,
      alignItems: 'center',
    },
  });