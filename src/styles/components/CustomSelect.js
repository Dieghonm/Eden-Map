import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.buttonWidth,
      height: componentSizes.buttonHeight,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.md,
      borderWidth: scale(1),
      borderColor: theme.terciario,
      justifyContent: 'center',
      paddingHorizontal: spacing.md,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      flex: 1,
    },
    arrow: {
      fontSize: fontSize.sm,
      color: theme.fontColor,
      marginLeft: spacing.sm,
    },
  });