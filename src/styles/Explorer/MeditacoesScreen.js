import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

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
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.md,
      alignSelf: 'flex-start',
    },

    // Seletor de caminhos
    pathScroll: {
      maxHeight: verticalScale(50),
      marginBottom: spacing.md,
    },
    pathContent: {
      paddingRight: spacing.md,
    },
    pathChip: {
      backgroundColor: theme.secondary,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      borderRadius: borderRadius.circle,
      marginRight: spacing.xxs,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    pathChipActive: {
      backgroundColor: theme.button,
      borderColor: theme.accent,
    },
    pathText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
    },
    pathTextActive: {
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },

    // Card da meditação
    meditationCard: {
      width: spacing.giant,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    meditationTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    meditationSubtitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      marginBottom: spacing.md,
    },
    meditationPlaceholder: {
      width: '100%',
      height: verticalScale(200),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.m,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
      padding: spacing.md,
    },
    placeholderTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    navButtonSmall: {
      width: horizontalScale(40),
      height: horizontalScale(40),
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navIconSmall: {
      fontSize: fontSize.md,
      color: theme.fontColor,
    },
    counterSmall: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      minWidth: horizontalScale(40),
      textAlign: 'center',
    },

    // Navegação principal
    navigation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    navButton: {
      width: horizontalScale(50),
      height: horizontalScale(50),
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navIcon: {
      fontSize: fontSize.xl,
      color: theme.fontColor,
    },
    navIconDisabled: {
      opacity: 0.3,
    },
    counter: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      minWidth: horizontalScale(60),
      textAlign: 'center',
    },
  });