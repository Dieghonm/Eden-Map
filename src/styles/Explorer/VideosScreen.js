import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: spacing.giant,
      marginHorizontal: spacing.md * 2,
      marginTop: spacing.xl + spacing.xs,
    },
    videoTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      alignSelf: 'flex-start',
      height: spacing.sm,
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
      fontFamily: fontFamily.r4,
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