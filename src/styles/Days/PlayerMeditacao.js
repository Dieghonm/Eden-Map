// src/styles/Days/PlayerMeditacao.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },
    playerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    circleContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
    },
    timeContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeText: {
      fontSize: fontSize.header,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    playButton: {
      width: horizontalScale(80),
      height: horizontalScale(80),
      borderRadius: borderRadius.circle,
      backgroundColor: theme.button,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    playButtonText: {
      fontSize: fontSize.header,
      color: theme.buttonTextColor,
    },
    phaseIndicator: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginVertical: spacing.xl,
    },
    phaseStep: {
      width: horizontalScale(60),
      height: horizontalScale(8),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.p,
    },
    phaseStepActive: {
      backgroundColor: theme.success,
    },
  });