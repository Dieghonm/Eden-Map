import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { spacing, borderRadius, fontSize, fontWeight, fontFamily } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: scale(1),
      borderBottomColor: theme.secondary,
    },
    title: {
      fontSize: fontSize.header,
      fontWeight: fontWeight.bold,
      color: theme.fontColor,
      fontFamily: fontFamily.b7,
    },
    
    // Botão Hamburguer
    hamburgerButton: {
      width: scale(40),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(8),
    },
    hamburgerLine: {
      width: scale(24),
      height: scale(3),
      backgroundColor: theme.fontColor,
      marginVertical: scale(2),
      borderRadius: scale(2),
    },
    
    // Modal e Menu
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    menuDropdown: {
      marginTop: spacing.xl + spacing.md + spacing.lg,
      marginRight: spacing.lg,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.m,
      padding: spacing.md,
      minWidth: scale(200),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: verticalScale(2) },
      shadowOpacity: 0.25,
      shadowRadius: scale(8),
      elevation: 5,
    },
    
    // Theme Selector
    themeSelector: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
      justifyContent: 'center',
    },
    themeButton: {
      width: scale(40),
      height: scale(40),
      borderRadius: borderRadius.circle,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: scale(2),
      borderColor: 'transparent',
    },
    lightButton: {
      backgroundColor: '#F9F9FB',
    },
    pinkButton: {
      backgroundColor: '#F4CDC0',
    },
    darkButton: {
      backgroundColor: '#212224',
    },
    activeButton: {
      borderColor: theme.accent,
      borderWidth: scale(3),
    },
    themeButtonText: {
      fontSize: fontSize.lg,
    },
    activeButtonText: {
      transform: [{ scale: 1.2 }],
    },
    
    // Logout Button
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