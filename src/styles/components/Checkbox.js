import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 290,
      height: 80,
      backgroundColor: theme.secondary,
      borderRadius: 10,
      paddingHorizontal: spacing.md,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: theme.terciario,
      borderRadius: borderRadius.sm,
      marginRight: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: theme.success,
      borderColor: theme.success,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: fontSize.md,
      fontWeight: 'bold',
    },
    checkboxLabel: {
      fontSize: fontSize.md,
      color: theme.fontColor,
      fontFamily: 'Outfit_400Regular',
      flex: 1,
    },
  });