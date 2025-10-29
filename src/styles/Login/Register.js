import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      alignItems: 'center',
    },
    space: {
      marginTop: spacing.xxs *3,
    },
  });