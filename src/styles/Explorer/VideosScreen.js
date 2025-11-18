import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: spacing.lg,
      alignItems: 'center',
    },
    videoTitle: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginTop: spacing.xs,
      textAlign: 'left',
      alignSelf: 'flex-start',
      height: spacing.xxl/2,
    },
    videoDescription: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      height: spacing.xs * 5
    },
    videoDuration: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.alert,
      marginBottom: spacing.xs,
    },    
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    navigation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      marginBottom: spacing.md,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
    },
    navButton: {
      width: horizontalScale(50),
      height: horizontalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    navIcon: {
      fontSize: fontSize.header,
      color: theme.fontColor,
    },
    navIconDisabled: {
      opacity: 0.3,
    },
    counter: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      minWidth: horizontalScale(60),
      textAlign: 'center',
      marginHorizontal: spacing.md
    },
  });