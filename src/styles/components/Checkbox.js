import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.checkboxWidth,
      height: componentSizes.checkboxHeight,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      margin: spacing.md,
      paddingHorizontal: spacing.md,
    },
    checkbox: {
      width: componentSizes.checkboxSize,
      height: componentSizes.checkboxSize,
      borderRadius: borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.fontColor,
      marginRight: scale(20),
      marginLeft: scale(40),
    },
    checkboxChecked: {
      backgroundColor: theme.button,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: verticalScale(16),
    },
    linkalert: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline',
      fontSize: fontSize.md,
    },
    linkwarning: {
      color: theme.warning,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline',
      fontSize: fontSize.md,
    },
  });