import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: componentSizes.buttonWidth,
      height: componentSizes.buttonHeight,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.md,
      borderWidth: horizontalScale(1),
      borderColor: theme.terciario,
      justifyContent: 'center',
      paddingHorizontal: spacing.sm,
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
      marginLeft: spacing.md,
    },
  });