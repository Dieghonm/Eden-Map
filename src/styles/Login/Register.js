import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      marginTop:115,
      alignItems: 'center',
    },
    Logo: {
      marginTop: 10
    },
    inputsContainer: {
      gap: spacing.md,
      width: '100%',
      alignItems: 'center',
    },
  });