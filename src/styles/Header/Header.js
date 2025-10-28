import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: spacing.xl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: scale(1),
      borderBottomColor: theme.secondary,
    },
    title: {
      fontSize: fontSize.header,
      fontWeight: fontWeight.bold,
      color: theme.fontColor,
      fontFamily: fontFamily.b7,
    },
    themeSelector: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    themeButton: {
      width: scale(40),
      height: scale(40),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: scale(2),
      borderColor: 'transparent',
    },
    lightButton: {
      backgroundColor: '#F9F9FB',
    },
    pinkButton: {
      backgroundColor: '#F4CDC0',
    },
    darkButton: {
      backgroundColor: '#212224',
    },
    activeButton: {
      borderColor: theme.accent,
      borderWidth: scale(3),
    },
    themeButtonText: {
      fontSize: fontSize.lg,
    },
    activeButtonText: {
      transform: [{ scale: 1.2 }],
    },
  });