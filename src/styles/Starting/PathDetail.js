import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    headerContainer: {
      alignItems: 'flex-start',
      width: spacing.giant,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
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
      lineHeight: spacing.xs + (spacing.xxs / 2),
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
    },
    mediaContainer: {
      width: spacing.giant,
      height: spacing.giant,
      alignItems: 'center',
      borderRadius: borderRadius.m,
      marginBottom: spacing.md,
    },
    image:{
      height:290,
      width:290,
    }
  });