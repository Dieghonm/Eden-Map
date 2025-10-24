import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/Checkbox';

export default function Checkbox({ 
  checked, 
  onPress, 
  textPrefix = '',
  textLink = '',
  disabled = false,
  color = ''
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const linkStyle =
    color === 'alert'
      ? styles.linkalert
      : color === 'warning'
      ? styles.linkwarning
      : { color: color || theme.fontColor };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{textPrefix}</Text>
        <Text style={linkStyle}>{textLink}</Text>
      </View>
    </TouchableOpacity>
  );
}
