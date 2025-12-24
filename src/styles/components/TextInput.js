import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme, isValid = true, showValidation = false) =>
  StyleSheet.create({
    container: {
      width: spacing.huge,
      height: spacing.xs * 2,
      backgroundColor: theme.terciario,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs - spacing.xxs,
      marginBottom: spacing.xs - spacing.xxs,
      borderWidth: horizontalScale(2),
      borderColor: 'transparent',
    },
    containerInvalid: {
      backgroundColor: theme.warning,
      opacity: 0.4,
    },
    input: {
      flex: 1,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      paddingHorizontal: spacing.xxs * 2,
      height: '100%',
    },
    eyeButton: {
      paddingRight: spacing.xxs * 2,
    },
  });