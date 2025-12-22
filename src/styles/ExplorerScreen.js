import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      marginTop: spacing.huge + spacing.sm
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
    buttonsContainer: {
      height: spacing.giant + (spacing.sm*2),
      gap: spacing.sm,
      margin: spacing.sm,
    },
  });