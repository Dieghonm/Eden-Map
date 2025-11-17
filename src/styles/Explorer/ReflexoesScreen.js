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
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.md,
      alignSelf: 'flex-start',
    },

    // Tabs
    tabContainer: {
      flexDirection: 'row',
      width: spacing.giant,
      marginBottom: spacing.md,
      gap: spacing.xxs,
    },
    tab: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xxs,
      borderRadius: borderRadius.m,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    tabActive: {
      backgroundColor: theme.button,
      borderColor: theme.accent,
    },
    tabText: {
      fontSize: fontSize.xs,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
    },
    tabTextActive: {
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },

    // Card de tracking
    trackingCard: {
      width: spacing.giant,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    question: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      textAlign: 'center',
    },

    // Gráfico
    chartContainer: {
      marginBottom: spacing.md,
    },
    barsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      height: verticalScale(150),
      marginBottom: spacing.xs,
    },
    barColumn: {
      alignItems: 'center',
      flex: 1,
    },
    barWrapper: {
      width: horizontalScale(60),
      height: '100%',
      justifyContent: 'flex-end',
      marginBottom: spacing.xxs,
    },
    bar: {
      width: '100%',
      borderTopLeftRadius: borderRadius.p,
      borderTopRightRadius: borderRadius.p,
    },
    emoji: {
      width: horizontalScale(40),
      height: horizontalScale(40),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emojiText: {
      fontSize: fontSize.lg,
    },
    percentagesRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    percentage: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      flex: 1,
      textAlign: 'center',
    },

    // Feedback
    feedback: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },

    // Respostas
    responsesContainer: {
      width: spacing.giant,
      marginBottom: spacing.md,
    },
    responseCard: {
      backgroundColor: theme.secondary,
      padding: spacing.xs,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      borderWidth: 2,
      borderColor: theme.button,
    },
    responseText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
    },
  });