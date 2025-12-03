import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    spacerBox: {
      marginTop: spacing.huge + spacing.md,
      height: spacing.xxxl
    },
    text: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.md,
      textAlign: 'left'
    },
    timerBox: {
      width: '100%'
    },
    progress: {
      width: '100%',
      height: spacing.xxs,
      backgroundColor: 'white',
      borderRadius: 4,
      overflow: 'hidden'
    },
    marcador: {
      height: spacing.xxs,
      backgroundColor: theme.success
    },
    icon: {
      width: spacing.xs,
      height: spacing.xs,
      borderRadius: borderRadius.m,
      backgroundColor: theme.success,
      position: 'absolute',
      top: -7
    },
    timerRow: {
      marginVertical: spacing.xs,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    timerText: {
      fontSize: spacing.xs * 2,
      fontWeight: '700',
      color: 'white'
    },
    playButton: {
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center'
    },
    playIcon: {
      width: spacing.lg,
      height: spacing.lg,
    }
  });
