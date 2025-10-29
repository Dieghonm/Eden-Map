import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { spacing, borderRadius, fontSize, fontFamily, componentSizes } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: spacing.huge,
      height: spacing.xs * 2,
      backgroundColor: theme.terciario,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs - spacing.xxs,
      marginBottom: spacing.xs - spacing.xxs,
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
      paddingRight : spacing.xxs * 2 ,

    },
  });