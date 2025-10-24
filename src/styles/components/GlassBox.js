import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 290,
      
    },
    containerDisabled: {
      opacity: 0.5,
    },
    glassGradient: {
      padding: 7,
      opacity: 0.8,
      borderRadius: borderRadius.xl,
      alignItems: 'center',
    },
  });
