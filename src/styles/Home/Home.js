import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xs,
    },
    desireCard: {
      paddingVertical: spacing.md,
      marginBottom: spacing.md,
    },
    cardTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      fontWeight: fontWeight.bold,
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

    // Modal Explorer Styles
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
      maxHeight: verticalScale(600),
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
    modalScroll: {
      maxHeight: verticalScale(400),
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    dataSection: {
      marginBottom: spacing.md,
      paddingBottom: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: theme.terciario,
    },
    dataLabel: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      fontWeight: fontWeight.bold,
      color: theme.alert,
      marginBottom: spacing.xxs,
    },
    dataValue: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: verticalScale(18),
      marginLeft: spacing.xxs,
    },
  });