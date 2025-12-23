import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/texts';


export const createStyles = (theme) =>
  StyleSheet.create({
    spacer:{
      // backgroundColor: '#0ABAB5',
      width: spacing.xxxl * 2,
      height: 70,
    }
  });