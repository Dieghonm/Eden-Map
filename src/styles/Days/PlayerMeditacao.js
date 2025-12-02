// src/styles/Days/PlayerMeditacao.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    // ========== CONTAINER ==========
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
    },

    // ========== HEADER ==========
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: spacing.xl,
    },

    headerButton: {
      width: horizontalScale(40),
      height: horizontalScale(40),
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerIcon: {
      width: horizontalScale(24),
      height: horizontalScale(24),
    },

    logo: {
      width: horizontalScale(50),
      height: verticalScale(33),
    },

    // ========== TIMER CARD ==========
    timerCard: {
      width: '100%',
      padding: spacing.md,
      marginBottom: spacing.md,
      alignItems: 'center',
    },

    timerTitle: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      textAlign: 'center',
    },

    // ========== BARRA DE PROGRESSO ==========
    progressBarContainer: {
      width: '100%',
      marginBottom: spacing.md,
    },

    progressBarBackground: {
      width: '100%',
      height: verticalScale(10),
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.circle,
      position: 'relative',
      overflow: 'visible',
    },

    progressBarFill: {
      height: '100%',
      backgroundColor: theme.button,
      borderRadius: borderRadius.circle,
    },

    progressCircle: {
      position: 'absolute',
      top: verticalScale(-5),
      left: 0,
      width: horizontalScale(20),
      height: horizontalScale(20),
      borderRadius: borderRadius.circle,
      backgroundColor: theme.button,
      shadowColor: theme.button,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 5,
    },

    // ========== CONTROLES DO TIMER ==========
    timerControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: spacing.xs,
    },

    timerText: {
      fontSize: fontSize.header,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },

    playButton: {
      width: horizontalScale(60),
      height: horizontalScale(60),
      borderRadius: borderRadius.circle,
      backgroundColor: theme.button,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },

    playIcon: {
      width: horizontalScale(30),
      height: horizontalScale(30),
      tintColor: theme.buttonTextColor,
    },

    playIconDisabled: {
      opacity: 0.3,
    },
  });