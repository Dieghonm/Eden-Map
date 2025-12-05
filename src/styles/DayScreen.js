import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../theme/texts';
import { horizontalScale, verticalScale } from '../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      gap: spacing.xs,
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
      height: spacing.lg,
      marginBottom: spacing.xs / 2
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      fontSize: fontSize.md,
    },
    spacer: {
      height: spacing.xxl / 2
    }
  });