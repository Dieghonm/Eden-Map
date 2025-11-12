import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      alignItems: 'center',
    },
    container: {
      alignItems: 'center',
      width: '100%',
    },
    inputContainer: {
      width: '100%',
      marginBottom: spacing.xs,
      marginTop: spacing.xxs
    },
    label: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    input: {
      width: '100%',
      minHeight: verticalScale(40),
      backgroundColor: theme.terciario,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
    },
    textArea: {
      minHeight: verticalScale(200),
      maxHeight: verticalScale(130),
    },
    helperText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
  });