import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 215,
      height: 40,
      backgroundColor: theme.terciario,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      marginTop: 23,
      marginBottom:7
    },
    input: {
      flex: 1,
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      height: '100%',
    },
    eyeButton: {
      padding: spacing.xs,
      marginLeft: spacing.sm,
    },
  });