import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      marginTop: spacing.xl,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },
    sinopse:{
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs / 2,
      alignSelf: 'flex-start',
    },
    videoTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginVertical: spacing.xs / 2,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    videoDescription: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      lineHeight: spacing.xs,
      marginBottom: spacing.md,
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
    },
    videoDuration: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      marginBottom: spacing.xs,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    spacer: {
      height: 2,
      width: spacing.giant,
      backgroundColor: theme.alert,
      marginBottom: spacing.md,
    }
  });