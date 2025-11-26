import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
      marginTop: spacing.lg

    },
    TextContainer: {
      alignItems: 'flex-start',
      gap: spacing.xxs,
    },
    Title: {
      color: theme.fontColor,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      height: spacing.md,
    },
    Text: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      height: spacing.md,
      marginBottom: spacing.xs
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      fontSize: fontSize.md,
    },
  });