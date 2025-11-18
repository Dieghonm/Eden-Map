import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';
import { darkTheme, lightTheme, pinkTheme } from '../../theme/colors';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.xxs * 2,
      paddingHorizontal: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: spacing.xxl * 3,
      alignSelf: 'center'
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs, 
    },
    iconButton: {
      width: spacing.md,
      height: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    icon: {
      width: spacing.md,
      height: spacing.md,
    },
    
    iconHome: {
      width: spacing.md,
      height: spacing.md,
    },
    
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    menuDropdown: {
      marginTop: spacing.lg,
      marginRight: spacing.xs,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      padding: spacing.xs,
      elevation: 5,
    },
    themeSelector: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
      justifyContent: 'center',
    },
    themeButton: {
      width: scale(40),
      height: scale(40),
      margin: spacing.xxs,
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lightButton: {
      backgroundColor: lightTheme.background,
    },
    pinkButton: {
      backgroundColor: pinkTheme.background,
    },
    darkButton: {
      backgroundColor: darkTheme.background,
    },
    activeButton: {

    },
    themeButtonText: {
      fontSize: fontSize.lg,
    },
    activeButtonText: {
      transform: [{ scale: 1.2 }],
    },
    resetButton: {
      backgroundColor: theme.alert,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.m,
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    resetButtonText: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: '#FFFFFF',
    },
    logoutButton: {
      backgroundColor: theme.warning,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.m,
      alignItems: 'center',
    },
    logoutButtonText: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.b7,
      color: '#FFFFFF',
    },
  });