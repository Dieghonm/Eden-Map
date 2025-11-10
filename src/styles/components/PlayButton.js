import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { borderRadius, spacing } from '../../theme/texts';

export const createStyles = (theme, width, height) =>
  StyleSheet.create({
    playBox:{
      flexDirection: 'row', 
      backgroundColor: theme.secondary,
      width: spacing.giant,
      height: spacing.xxs + (spacing.md *2),
      borderRadius: borderRadius.circle,
      padding : spacing.xxs+ (spacing.xxs/2)
    },
      PlayButton: {
      width: horizontalScale(width),
      height: verticalScale(height),
      marginBottom: spacing.xxs,
    },

  });