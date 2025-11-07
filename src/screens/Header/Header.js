import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
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
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    logout(setUser, navigation);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>EdenMap</Text>
        
        {/* Botão Sanduíche */}
        <TouchableOpacity 
          style={styles.hamburgerButton}
          onPress={() => setMenuVisible(!menuVisible)}
          activeOpacity={0.7}
        >
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuDropdown}>
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
              <Text style={styles.logoutButtonText}>🚪 Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}