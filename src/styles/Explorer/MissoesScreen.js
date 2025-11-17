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
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
    },
    tabTextActive: {
      fontFamily: fontFamily.b7,
      color: theme.buttonTextColor,
    },

    // Container de missões
    missionsContainer: {
      width: spacing.giant,
      marginBottom: spacing.md,
    },

    // Card de missão em andamento
    missionCard: {
      padding: spacing.md,
    },
    missionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    missionDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
    },

    // Progresso
    progressContainer: {
      marginBottom: spacing.md,
    },
    progressLabel: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xxs,
    },
    progressBarBg: {
      width: '100%',
      height: verticalScale(12),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.p,
      overflow: 'hidden',
      marginBottom: spacing.xxs,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.success,
      borderRadius: borderRadius.p,
    },
    progressText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.alert,
    },

    // Missões passadas
    pastMissionCard: {
      backgroundColor: theme.secondary,
      padding: spacing.xs,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      borderWidth: 2,
      borderColor: theme.success,
    },
    pastMissionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xxs,
    },
    checkIcon: {
      fontSize: fontSize.xl,
      color: theme.success,
      marginRight: spacing.xxs,
      fontFamily: fontFamily.b7,
    },
    pastMissionInfo: {
      flex: 1,
    },
    pastMissionTitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    pastMissionDate: {
      fontSize: fontSize.xs,
      fontFamily: fontFamily.r4,
      color: theme.success,
    },
    pastMissionDescription: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs - spacing.xxs,
    },
  });