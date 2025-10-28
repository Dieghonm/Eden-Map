import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { spacing } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      marginTop: verticalScale(60),
      alignItems: 'center',
      paddingBottom: spacing.xl,
    },
    logoContainer: {
      marginTop: spacing.xl,
    },
  });