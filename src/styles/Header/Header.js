import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';
import { darkTheme, lightTheme, pinkTheme } from '../../theme/colors';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.xxs *2,
      paddingHorizontal: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      resizeMode: 'contain',
    },
    
    iconHome: {
      width: spacing.md,
      height: spacing.md,
      resizeMode: 'contain',
    },
    
    modalOverlay: {
      flex: 1,
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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