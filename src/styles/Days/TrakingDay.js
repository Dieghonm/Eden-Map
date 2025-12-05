import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      marginTop: spacing.xl
    },

    gif: {
      width: spacing.xxxl,
      height: spacing.xxxl,
      borderRadius: borderRadius.circle,
      marginBottom: spacing.lg,
    },

    texto: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'left',
      width: spacing.giant,
      marginBottom: spacing.md
    },

    quest: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      textAlign: 'center',
      marginBottom: spacing.xs
    },

    respostasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.md,
      gap: spacing.xs,
    },

    iconeWrapper: {
      padding: spacing.xxs,
      borderRadius: borderRadius.p,
      width: spacing.lg + spacing.xxs,
      height: spacing.lg + spacing.xxs,
      alignItems: 'center',
      shadowColor: '#000000ff',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      justifyContent: 'center',
      elevation: 6, // Android
    },

    iconeFeliz: {
      width: spacing.xs * 2,
      height: spacing.lg / 2,
    },

    iconeNeutro: {
      width: spacing.md,
      alignSelf: 'center'
    },

    iconeTriste: {
      width: spacing.xs * 2,
      height: spacing.xs * 2,
    },

    borderSelected: {
      borderWidth: 2,
      borderColor: "yellow",
      borderRadius: 8,
    },
  });