import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.md,
      alignSelf: 'flex-start',
    },
    subtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b4,
      color: theme.fontColor,
      marginVertical: spacing.md,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    chartContainer: {
      marginBottom: spacing.md,
    },
    barsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginHorizontal: 5,
      height:100
    },
    barWrapper: {
      width: 50,
      marginRight: 10,
      alignItems: 'center',
    },
    bar: {
      width: 40,
      borderRadius: borderRadius.sm,
    },
    separator: {
      height: 5,
      backgroundColor: '#FFFFFF',
      marginRight: 10,
      marginBottom: 5
    },
    labelsRow: {
      flexDirection: 'row',
      marginLeft:10
    },
    barLabel: {
      width: 50,
      marginRight: 10,
      textAlign: 'center',
      fontSize: fontSize.xs,
      color: theme.fontColor,
    },
  });
