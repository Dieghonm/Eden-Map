import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 290,
      height: 45,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.terciario,
      justifyContent: 'center',
      paddingHorizontal: spacing.md,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: 'Outfit_400Regular',
      color: theme.fontColor,
      flex: 1,
    },
    arrow: {
      fontSize: fontSize.sm,
      color: theme.fontColor,
      marginLeft: spacing.sm,
    },
  });