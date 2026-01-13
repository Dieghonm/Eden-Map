import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, fontWeight, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: spacing.md,
      paddingHorizontal: spacing.sm,
    },
    title: {
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
    },
    text: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.r4,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginLeft: spacing.sm,
      marginBottom: spacing.xs,
    },
    highlight: {
      color: theme.alert,
    },
    cardTitle: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginBottom: spacing.xs / 2,
      paddingHorizontal: spacing.sm,
    },
    line:{
      height:1,
      width: spacing.giant,
      backgroundColor: theme.alert,
      marginBottom: spacing.xs,

    },
    imageContainer: {
      width: horizontalScale(250),
      height: verticalScale(250),
      marginBottom: spacing.xs,
      borderRadius: borderRadius.m,
      overflow: 'hidden',
    },
    pathImage: {
      width: '100%',
      height: '100%',
    },
    path: {
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      color: theme.fontColor,
      alignSelf: 'flex-start',
      marginTop: spacing.xxs,
      marginBottom: spacing.sm / 2,
      paddingHorizontal: spacing.xs / 2,
    },
    editButton: {
      height: spacing.xs * 2,
      width: spacing.xxl,
      backgroundColor: theme.terciario,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs
    },
    editButtonText: {
      color: theme.fontColor,
      fontSize: fontSize.md,
      fontFamily: fontFamily.b7,
    }
  });