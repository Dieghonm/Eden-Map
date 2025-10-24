import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      marginTop: 60,
      alignItems: 'center',
    },
    logoContainer: {
      marginTop: spacing.xl,
    },
  });