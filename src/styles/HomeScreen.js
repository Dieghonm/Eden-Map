import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: 'transparent',
    // },
    // content: {
    //   flex: 1,
    //   padding: spacing.lg,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // welcomeCard: {
    //   backgroundColor: theme.secondary,
    //   padding: spacing.xl,
    //   borderRadius: borderRadius.xl,
    //   width: '100%',
    //   maxWidth: scale(400),
    //   alignItems: 'center',
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: verticalScale(2) },
    //   shadowOpacity: 0.1,
    //   shadowRadius: scale(8),
    //   elevation: 5,
    // },
    // welcomeTitle: {
    //   fontSize: fontSize.header,
    //   fontWeight: fontWeight.bold,
    //   color: theme.fontColor,
    //   fontFamily: fontFamily.b7,
    //   marginBottom: spacing.sm,
    // },
    // welcomeText: {
    //   fontSize: fontSize.lg,
    //   color: theme.fontColor,
    //   fontFamily: fontFamily.r4,
    //   textAlign: 'center',
    //   lineHeight: verticalScale(24),
    // },
    // userName: {
    //   color: theme.accent,
    //   fontWeight: fontWeight.bold,
    //   fontFamily: fontFamily.b7,
    // },
    // logoutContainer: {
    //   marginTop: spacing.xl,
    //   alignItems: 'center',
    // },
  });