import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/ReflexoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function ReflexoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
    </SafeAreaView>
  );
}