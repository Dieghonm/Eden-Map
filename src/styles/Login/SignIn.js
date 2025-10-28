import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: theme.secondary,
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.xl,
      alignItems: 'center',
      gap: spacing.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: verticalScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: scale(8),
      elevation: 5,
      width: scale(340),
      maxWidth: '90%',
    },
    title: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
    },
    linksContainer: {
      width: '100%',
      gap: spacing.md,
      alignItems: 'center',
    },
    linkText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      textAlign: 'center',
      lineHeight: verticalScale(18),
    },
    linkHighlight: {
      color: '#4A90E2',
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
    },
    inputsContainer: {
      gap: spacing.md,
      width: '100%',
      alignItems: 'center',
    },
  });