import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: spacing.lg + spacing.xxs * 2,
      paddingHorizontal: spacing.sm,
      // paddingTop: spacing.xs,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
    },
    highlight: {
      color: theme.alert,
    },
    desireCard: {
      paddingTop: spacing.sm,
    },
    cardTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    line:{
      height:2,
      width: spacing.huge,
      backgroundColor: theme.alert,
      marginBottom: spacing.xs,
    },
    feelingsContainer: {
      gap: spacing.xs,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    feelingChip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: borderRadius.m,
      backgroundColor: theme.secondary,
      height:spacing.xxl /2,
      width: spacing.huge,
      alignItems: 'center',
      paddingHorizontal: spacing.xs
      
    },
    feelingText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    color: {
      height:spacing.xl/2,
      width: spacing.xl/2,
      borderRadius: borderRadius.m,
    },
    editButton: {
      height: spacing.xs * 2,
      width: spacing.xxl,
      backgroundColor: theme.terciario,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm

    },
    editButtonText: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
    }
  });