import { StyleSheet } from 'react-native';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    logo: {
      width: width,
      height: height,
      marginBottom: 5
    },
  });