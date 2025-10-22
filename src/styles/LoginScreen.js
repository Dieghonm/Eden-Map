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
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    card: {
      backgroundColor: theme.secondary,
      padding: spacing.xl,
      borderRadius: borderRadius.xl,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    title: {
      fontSize: fontSize.title,
      fontWeight: fontWeight.bold,
      color: theme.fontColor,
      fontFamily: 'Outfit_700Bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    input: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.terciario,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      fontSize: fontSize.md,
      color: theme.fontColor,
      fontFamily: 'Outfit_400Regular',
      marginBottom: spacing.md,
    },
    button: {
      backgroundColor: theme.button,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      marginTop: spacing.md,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
    },
  });