import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.inputWidth,
      height: componentSizes.inputHeight,
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      marginTop: verticalScale(23),
      marginBottom: verticalScale(7),
    },
    input: {
      flex: 1,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      height: '100%',
    },
    eyeButton: {
      padding: spacing.xs,
      marginLeft: spacing.sm,
    },
  });