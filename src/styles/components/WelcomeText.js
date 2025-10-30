import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: spacing.xs,
    },
    title: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
    },
    link: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.alert,
      textDecorationLine: 'underline',
    },
  });