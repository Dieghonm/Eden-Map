import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../utils/responsive';

export const createStyles = (theme, size) => {
  const scaledSize = horizontalScale(size);
  
  return StyleSheet.create({
    container: {
      width: scaledSize,
      height: scaledSize,
      borderRadius: scaledSize / 2,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
};