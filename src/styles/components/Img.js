import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export const createStyles = (theme, size) => {
  const scaledSize = scale(size);
  
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