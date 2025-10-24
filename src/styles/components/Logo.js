import { StyleSheet } from 'react-native';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    logo: {
      width: width,
      height: height,
      padding: 0
    },
  });