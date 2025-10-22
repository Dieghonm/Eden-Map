import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    content: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeCard: {
      backgroundColor: theme.secondary,
      padding: spacing.xl,
      borderRadius: borderRadius.xl,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    welcomeTitle: {
      fontSize: fontSize.header,
      fontWeight: fontWeight.bold,
      color: theme.fontColor,
      fontFamily: 'Outfit_700Bold',
      marginBottom: spacing.md,
    },
    welcomeText: {
      fontSize: fontSize.lg,
      color: theme.fontColor,
      fontFamily: 'Outfit_400Regular',
      textAlign: 'center',
      lineHeight: 24,
    },
    userName: {
      color: theme.accent,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
    },
  });