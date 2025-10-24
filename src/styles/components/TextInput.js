import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
    //   width: 290,
    //   height: 45,
      backgroundColor: theme.secondary,
    //   borderRadius: borderRadius.md,
    //   borderWidth: 1,
    //   borderColor: theme.terciario,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   paddingHorizontal: spacing.md,
    },
    // input: {
    //   flex: 1,
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,,
    //   color: theme.fontColor,
    //   height: '100%',
    // },
    // eyeButton: {
    //   padding: spacing.xs,
    //   marginLeft: spacing.sm,
    // },
    // eyeIcon: {
    //   fontSize: fontSize.lg,
    // },
  });