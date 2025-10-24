import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/CustomSelect';

export default function CustomSelect({ 
  label, 
  placeholder = 'Selecione...', 
  onPress, 
  disabled = false 
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.containerDisabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={styles.text}>
          {label || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </View>
    </TouchableOpacity>
  );
}