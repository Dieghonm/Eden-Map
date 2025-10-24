import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 290,
      minHeight: 65,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    containerDisabled: {
      opacity: 0.5,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      borderRadius: borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginRight: spacing.md,
      flexShrink: 0,
    },
    checkboxChecked: {
      backgroundColor: '#4A90E2',
      borderColor: '#4A90E2',
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: fontWeight.bold,
    },
    textContainer: {
      flex: 1,
    },
    text: {
      fontSize: 11,
      fontFamily: 'Outfit_400Regular',
      color: '#FFFFFF',
      lineHeight: 16,
    },
    link: {
      color: '#4A90E2',
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
    },
    linkPink: {
      color: '#FF6B9D',
      fontWeight: fontWeight.bold,
      fontFamily: 'Outfit_700Bold',
    },
  });