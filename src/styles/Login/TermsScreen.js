import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      alignItems: 'center',
    },
    // title: {
    //   fontSize: fontSize.title,
    //   fontWeight: fontWeight.bold,
    //   color: theme.fontColor,
    //   fontFamily: fontFamily.b7,
    //   marginBottom: spacing.md,
    //   textAlign: 'center',
    // },
    // scrollContent: {
    //   maxHeight: 300,
    //   marginBottom: spacing.lg,
    // },
    // termsText: {
    //   fontSize: fontSize.md,
    //   color: theme.fontColor,
    //   fontFamily: fontFamily.r4,
    //   lineHeight: 22,
    //   marginBottom: spacing.sm,
    // },
    // checkboxContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   marginBottom: spacing.lg,
    // },
    // checkbox: {
    //   width: 24,
    //   height: 24,
    //   borderWidth: 2,
    //   borderColor: theme.terciario,
    //   borderRadius: borderRadius.sm,
    //   marginRight: spacing.md,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // checkboxChecked: {
    //   backgroundColor: theme.success,
    //   borderColor: theme.success,
    // },
    // checkboxLabel: {
    //   fontSize: fontSize.md,
    //   color: theme.fontColor,
    //   fontFamily: fontFamily.r4,
    //   flex: 1,
    // },
    // button: {
    //   backgroundColor: theme.button,
    //   padding: spacing.md,
    //   borderRadius: borderRadius.md,
    //   alignItems: 'center',
    // },
    // buttonDisabled: {
    //   backgroundColor: theme.placeholder,
    //   opacity: 0.5,
    // },
    // buttonText: {
    //   color: '#FFFFFF',
    //   fontSize: fontSize.lg,
    //   fontWeight: fontWeight.bold,
    // fontFamily: fontFamily.b7,
    // },
  });