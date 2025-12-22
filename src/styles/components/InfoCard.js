import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: spacing.xxs,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: spacing.xs,
      marginBottom: spacing.xxs,
    },
    title: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    content: {
      // gap: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    item: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: verticalScale(18),
    },
  });