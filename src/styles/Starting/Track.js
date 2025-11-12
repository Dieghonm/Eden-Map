import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      marginBottom: spacing.md
    },
    pathButton: {
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      marginBottom: spacing.xs,
      height: spacing.lg + (spacing.md/2),
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
  });