// src/screens/Header/Header.js - VERSÃO SEM ALERTS
import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Modal, Text, Image, Pressable } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Header/Header';
import { logout } from '../../utils/authHelper';
import Logo from '../../components/Logo';
import { spacing } from '../../theme/texts';

export default function Header({ onHomePress, onResetStarting }) {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { 
    setUser,
    resetStarting 
  } = useContext(AppContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = createStyles(theme);

  const handleLogout = () => {
    setMenuVisible(false);
    logout(setUser, null);
  };

  const handleResetStarting = async () => {
    setMenuVisible(false);
    
    try {
      await resetStarting();
      
      if (onResetStarting) {
        onResetStarting();
      }
    } catch (error) {
      console.error('❌ Erro ao resetar jornada:', error);
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Logo width={spacing.lg} height={spacing.md} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleHomePress}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/icons/Home.png')} 
              style={styles.icon}
              tintColor={theme.secundaryButton}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setMenuVisible(!menuVisible)}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/icons/Config.png')} 
              style={styles.icon}
              tintColor={menuVisible ? theme.alert : theme.secundaryButton}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
        statusBarTranslucent
        accessible={true}
        accessibilityViewIsModal={true}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          <Pressable
            style={styles.menuDropdown}
            onPress={(e) => e.stopPropagation()}
            accessible={true}
            accessibilityRole="menu"
          >
            <View style={styles.themeSelector}>
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  styles.lightButton,
                  currentTheme === 'light' && styles.activeButton
                ]}
                onPress={() => toggleTheme('light')}
                accessibilityLabel="Tema claro"
                accessibilityRole="button"
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
                accessibilityLabel="Tema rosa"
                accessibilityRole="button"
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
                accessibilityLabel="Tema escuro"
                accessibilityRole="button"
              >
                <Text style={[
                  styles.themeButtonText,
                  currentTheme === 'dark' && styles.activeButtonText
                ]}>🌙</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetStarting}
              activeOpacity={0.7}
              accessibilityLabel="Reiniciar jornada"
              accessibilityRole="button"
            >
              <Text style={styles.resetButtonText}>🔄 Reiniciar Jornada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
              accessibilityLabel="Sair da conta"
              accessibilityRole="button"
            >
              <Text style={styles.logoutButtonText}>🚪 Sair</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}