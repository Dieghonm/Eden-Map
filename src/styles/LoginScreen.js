import { StyleSheet } from 'react-native';
import { spacing } from '../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    content:{
      marginBottom: spacing.md
    },
  });