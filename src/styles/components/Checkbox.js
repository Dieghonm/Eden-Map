import { StyleSheet } from 'react-native';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 290,
      height: 80,
      backgroundColor: theme.secondary,
      borderRadius: borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      margin:15,
    },
    checkbox: {
      width: 15,
      height: 15,
      borderRadius: borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.fontColor,
      marginRight: 20,
      marginLeft: 40
    },
    checkboxChecked: {
      backgroundColor: theme.button,
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: 16,
    },
    linkalert: {
      color: theme.alert,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline'
    },
    linkwarning: {
      color: theme.warning,
      fontFamily: fontFamily.r4,
      textDecorationLine: 'underline'
    },
  });