import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Modal, Text, Image, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Header/Header';
import { logout } from '../../utils/authHelper';
import Logo from '../../components/Logo';
import { spacing } from '../../theme/texts';

export default function Header({ onHomePress, onResetStarting }) {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { setUser } = useContext(AppContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = createStyles(theme);

  const handleLogout = () => {
    setMenuVisible(false);
    logout(setUser, null);
  };

  const handleResetStarting = () => {
    Alert.alert(
      'Reiniciar Jornada',
      'Isso irá apagar seu desejo, sentimentos e caminho. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeData('desireName');
              await removeData('desireDescription');
              await removeData('selectedFeelings');
              await removeData('selectedPath');
              
              setMenuVisible(false);
              
              if (onResetStarting) {
                onResetStarting();
              }
              
              Alert.alert('Sucesso', 'Dados apagados! Você pode começar uma nova jornada.');
            } catch (error) {
              console.error('❌ Erro ao apagar dados:', error);
              Alert.alert('Erro', 'Não foi possível apagar os dados.');
            }
          }
        }
      ]
    );
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
              style={[styles.icon, { tintColor: theme.secundaryButton }]}
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
              style={styles.resetButton}
              onPress={handleResetStarting}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>🔄 Reiniciar Jornada</Text>
            </TouchableOpacity>

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