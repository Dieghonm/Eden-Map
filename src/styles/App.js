import { StyleSheet } from 'react-native';
import { spacing } from '../theme/texts';

export const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors?.background || '#212224',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    overlay: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },

    testeDeAltura:{
      backgroundColor: '#0ABAB5',
      width: spacing.xxxl * 2,
      height:5,
      position: 'absolute',
      top: spacing.xxxl * 4 + spacing.xxs,
      // top: spacing.xxxl * 4 + 5,
    },
  });

