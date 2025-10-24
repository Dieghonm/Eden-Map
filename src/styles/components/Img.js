import { StyleSheet } from 'react-native';

export const createStyles = (theme, size) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });