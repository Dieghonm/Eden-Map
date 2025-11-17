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
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.md,
      alignSelf: 'flex-start',
    },

    // Filtros
    filterScroll: {
      maxHeight: verticalScale(50),
      marginBottom: spacing.md,
    },
    filterContent: {
      paddingRight: spacing.md,
    },
    filterChip: {
      backgroundColor: theme.secondary,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      borderRadius: borderRadius.circle,
      marginRight: spacing.xxs,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    filterChipActive: {
      backgroundColor: theme.button,
      borderColor: theme.accent,
    },
    filterText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
    },
    filterTextActive: {
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },

    // Card do vídeo
    videoCard: {
      width: spacing.giant,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    videoTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    videoDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.xs,
    },
    videoDuration: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.alert,
      marginBottom: spacing.md,
    },
    videoPlaceholder: {
      width: '100%',
      height: verticalScale(180),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.m,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    placeholderText: {
      fontSize: fontSize.header,
    },

    // Navegação
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