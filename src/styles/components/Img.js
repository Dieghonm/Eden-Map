import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../utils/responsive';

export const createStyles = (theme, size) => {
  const scaledSize = Math.min(horizontalScale(size), 300);

  return StyleSheet.create({
    container: {
      width: scaledSize,
      height: scaledSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    borderGlow: {
      position: 'absolute',
      width: scaledSize,
      height: scaledSize,
      borderRadius: 50,
      borderWidth: 20,
      // borderColor: '#0759b6ff',
      borderColor: theme.accent,
      opacity: 0.6
    },
    image: {
      width: scaledSize,
      height: scaledSize,
      borderRadius: 50
    }
  });
};
