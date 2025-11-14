// src/styles/Starting/QuizQuestionnaire.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    viewTitle: {
      alignItems: 'flex-start',
      marginTop:spacing.xs,
    },
    questionTitle: {
      color: theme.fontColor,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      marginBottom: spacing.xs / 2,
      
    },
    highlight: {
      color: theme.alert,
      fontFamily: fontFamily.b7,
      fontSize: fontSize.xxl,
    },
    questionNumber: {
      color: theme.fontColor,
      fontSize: fontSize.xxl,
      fontFamily: fontFamily.b7,
      marginBottom: spacing.xs,
      paddingRight: spacing.xxxl
    },
    progressContainer: {
      flexDirection: 'row',
      width: spacing.giant,
      justifyContent: 'center',
    },
    progressBar: {
      flex: 1,
      height: verticalScale(4),
      marginHorizontal:2,
      backgroundColor: theme.terciario,
      borderRadius: borderRadius.p,
    },
    progressActive: {
      backgroundColor: theme.success,
    },
    questionText: {
      color: theme.fontColor,
      fontSize: fontSize.xl,
      fontFamily: fontFamily.b7,
      marginVertical: spacing.xs,
      height: spacing.md * 2,
    },
    viewOptions: {
      marginBottom: spacing.md
    },
    optionButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.xs,
      backgroundColor: theme.secondary,
      width: spacing.giant,
      height: spacing.xxl / 2,
      marginTop: spacing.xs,
      borderRadius: borderRadius.m,
    },
    optionText: {
      color: theme.fontColor,
      fontSize: fontSize.lg,
      fontFamily: fontFamily.b7,
    },
    optionIconContainer: {
      alignItems: 'center',
      width: spacing.lg,
      height: spacing.lg,
      justifyContent: 'center',
    },

  });