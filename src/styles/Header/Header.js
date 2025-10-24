import { StyleSheet } from 'react-native';
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
      borderBottomWidth: 1,
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
      width: 40,
      height: 40,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
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
      borderWidth: 3,
    },
    themeButtonText: {
      fontSize: fontSize.lg,
    },
    activeButtonText: {
      transform: [{ scale: 1.2 }],
    },
  });