import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    logo: {
      width: scale(width),
      height: verticalScale(height),
      marginBottom: verticalScale(5),
    },
  });