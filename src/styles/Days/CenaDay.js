import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    cenaCount: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      textAlign: 'left',
    },
    highlight: {
      color: theme.alert,
    },

    inputGroup: {
      width: '100%',
      marginBottom: spacing.md / 2,
    },

    cenaTitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs / 2,
      padding: spacing.xxs,
      textAlign: 'left',
    },

    cenaPart: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      padding: spacing.xxs,
      textAlign: 'left',
    },

    input: {
      marginHorizontal: spacing.xxs,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs / 2,
      color: theme.fontColor,
      backgroundColor: theme.terciario,
      textAlignVertical: 'top',
    },
    inputGrande: {
      minHeight: spacing.xxxl,
    },
  });


