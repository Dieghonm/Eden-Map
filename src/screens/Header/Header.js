import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Header/Header';

export default function Header() {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EdenMap</Text>
      
      <View style={styles.themeSelector}>
        <TouchableOpacity
          style={[
            styles.themeButton,
            styles.lightButton,
            currentTheme === 'light' && styles.activeButton
          ]}
          onPress={() => toggleTheme('light')}
        >
          <Text style={[
            styles.themeButtonText,
            currentTheme === 'light' && styles.activeButtonText
          ]}>☀️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.themeButton,
            styles.pinkButton,
            currentTheme === 'pink' && styles.activeButton
          ]}
          onPress={() => toggleTheme('pink')}
        >
          <Text style={[
            styles.themeButtonText,
            currentTheme === 'pink' && styles.activeButtonText
          ]}>🌸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.themeButton,
            styles.darkButton,
            currentTheme === 'dark' && styles.activeButton
          ]}
          onPress={() => toggleTheme('dark')}
        >
          <Text style={[
            styles.themeButtonText,
            currentTheme === 'dark' && styles.activeButtonText
          ]}>🌙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}