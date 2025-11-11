import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
    },
    title: {
      fontSize: fontFamily.b7,
      color: theme.fontColor,
      fontSize: fontSize.xxl,
    },
    subtitle: {
      fontSize: fontFamily.r4,
      color: theme.fontColor,
      fontSize: fontSize.lg,
    },
    highlight: {
      color: theme.alert,
    },
    desireCard: {
      paddingVertical: spacing.md,
      marginBottom: spacing.md,
    },
    cardTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
    },
    feelingsContainer: {
      width: '100%',
      gap: spacing.xs,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    feelingChip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.m,
      alignItems: 'center',
    },
    feelingText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: '#FFFFFF',
    },

    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },
    modalContent: {
      width: '100%',
      maxWidth: horizontalScale(350),
      paddingVertical: spacing.lg,
    },
    modalTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      fontWeight: fontWeight.bold,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    modalFeelingsList: {
      gap: spacing.sm,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    modalFeelingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.m,
      minHeight: verticalScale(45),
    },
    modalFeelingSelected: {
      borderWidth: horizontalScale(3),
      borderColor: '#FFFFFF',
    },
    modalFeelingText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: '#FFFFFF',
    },
    checkmark: {
      fontSize: fontSize.xl,
      color: '#FFFFFF',
      fontWeight: fontWeight.bold,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: spacing.md,
      paddingHorizontal: spacing.md,
      marginTop: spacing.xs,
    },
  });