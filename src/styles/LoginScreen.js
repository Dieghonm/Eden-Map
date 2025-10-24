import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      marginTop: 62
    },
    content: {
      padding: 30,
    },
  });