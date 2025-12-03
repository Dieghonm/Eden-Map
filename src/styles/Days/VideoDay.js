import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },
    videoTitle: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
      textAlign: 'center',
      width:330
    },
    videoDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    videoDuration: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.alert,
      marginVertical: spacing.xs,
    },
  });