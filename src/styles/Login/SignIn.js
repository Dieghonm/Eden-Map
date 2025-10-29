import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
    //   flex: 1,
    //   width: '100%',
    //   justifyContent: 'center',
      alignItems: 'center',
    //   paddingHorizontal: scale(20),
    },
    space: {
      marginTop: spacing.xxs * 3,
    }
    // card: {
    //   paddingVertical: spacing.xl,
    //   paddingHorizontal: spacing.lg,
    //   alignItems: 'center',
    //   width: '100%',
    //   maxWidth: scale(340),
    // },
    // title: {
    //   fontSize: fontSize.xl,
    //   fontWeight: fontWeight.bold,
    //   fontFamily: fontFamily.b7,
    //   color: theme.fontColor,
    //   textAlign: 'center',
    //   marginTop: spacing.xs,
    //   marginBottom: spacing.md,
    // },
    // linksContainer: {
    //   width: '100%',
    //   gap: spacing.md,
    //   alignItems: 'center',
    //   marginBottom: spacing.lg,
    // },
    // linkText: {
    //   fontSize: fontSize.sm,
    //   fontFamily: fontFamily.r4,
    //   color: theme.fontColor,
    //   textAlign: 'center',
    //   lineHeight: verticalScale(18),
    // },
    // linkHighlight: {
    //   color: theme.alert,
    //   fontWeight: fontWeight.bold,
    //   fontFamily: fontFamily.b7,
    //   textDecorationLine: 'underline',
    // },
    // inputsContainer: {
    //   gap: spacing.xs,
    //   width: '100%',
    //   alignItems: 'center',
    //   marginBottom: spacing.md,
    // },
    // errorText: {
    //   color: theme.warning,
    //   fontSize: fontSize.sm,
    //   fontFamily: fontFamily.r4,
    //   textAlign: 'center',
    //   marginBottom: spacing.sm,
    // },
    // loadingContainer: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingVertical: spacing.md,
    // },
    // loadingText: {
    //   color: theme.fontColor,
    //   fontSize: fontSize.md,
    //   fontFamily: fontFamily.r4,
    //   marginTop: spacing.sm,
    // },
  });