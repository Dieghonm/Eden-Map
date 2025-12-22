import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
    },
    feelingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    feelingRow:{
      flexDirection: 'row',
      backgroundColor: theme.fontColor,
      width: spacing.xxl + spacing.sm,
      height: spacing.xs *2,
      borderRadius: borderRadius.circle,
      padding: spacing.xxs *1.5,
      paddingLeft: spacing.xs,
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: spacing.xxs *2
    },
    feelingText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.r4,
      color: theme.background,
      textAlign: 'center',
    },
    checkCircle: {
      width: horizontalScale(30),
      height: horizontalScale(30),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spacer: {
      height:spacing.sm / 2
    },
    playIcon:{
      height: spacing.md
    }
  });