import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing } from '../../theme/texts';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    logo: {
      width: horizontalScale(width),
      height: verticalScale(height),
      marginBottom: spacing.xxs,
    },
  });