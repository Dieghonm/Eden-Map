import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Modal, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Header/Header';
import { logout } from '../../utils/authHelper';
import Logo from '../../components/Logo';
import { spacing } from '../../theme/texts';

export default function Header() {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { setUser } = useContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = createStyles(theme);

  const isHomeScreen = route.name === 'Home';

  const handleLogout = () => {
    setMenuVisible(false);
    logout(setUser, navigation);
  };

  const handleHomePress = () => {
    if (!isHomeScreen) {
      navigation.navigate('Home');
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
            disabled={isHomeScreen}
          >
            <Image 
              source={require('../../../assets/icons/Home.png')} 
              style={[
                styles.icon,
                { tintColor: isHomeScreen ? theme.alert : theme.secundaryButton }
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setMenuVisible(!menuVisible)}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/icons/Config.png')} 
              style={[
                styles.icon,
                { tintColor: menuVisible ? theme.alert : theme.secundaryButton }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

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