import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Header/Header';
import { logout } from '../../utils/authHelper';

export default function Header() {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { setUser } = useContext(AppContext);
  const navigation = useNavigation();
  const styles = createStyles(theme);

  const handleLogout = () => {
    logout(setUser, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EdenMap</Text>
      
      <View style={styles.rightSection}>
        {/* Theme Selector */}
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

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutButtonText}>🚪</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}