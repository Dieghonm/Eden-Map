import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { spacing, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      marginBottom: verticalScale(15),
      paddingHorizontal: spacing.md,
    },
    title: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    link: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      fontWeight: fontWeight.bold,
      color: theme.alert,
      textDecorationLine: 'underline',
    },
  });