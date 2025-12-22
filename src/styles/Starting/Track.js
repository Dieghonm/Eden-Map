import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      marginBottom: spacing.sm
    },
    pathButton: {
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      height: spacing.lg + spacing.sm / 2,
      width: spacing.giant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pathButtonSelected: {
      backgroundColor: theme.terciario,
    },
    pathText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBox: {
      width: spacing.giant,
      backgroundColor: theme.secondary,
      padding: spacing.xs,
      borderRadius: borderRadius.x,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    modalDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.xs,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      fontSize: fontSize.md,
    },
  });
