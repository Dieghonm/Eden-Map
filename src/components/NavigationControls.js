// src/components/NavigationControls.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/NavigationControls';

export default function NavigationControls({
  currentIndex,
  total,
  onPrevious,
  onNext,
  style
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.navigation, style]}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={onPrevious}
        disabled={currentIndex === 0}
      >
        <Text style={[
          styles.navIcon,
          currentIndex === 0 && styles.navIconDisabled
        ]}>◀</Text>
      </TouchableOpacity>

      <Text style={styles.counter}>
        {currentIndex + 1}/{total}
      </Text>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={onNext}
        disabled={currentIndex === total - 1}
      >
        <Text style={[
          styles.navIcon,
          currentIndex === total - 1 && styles.navIconDisabled
        ]}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}