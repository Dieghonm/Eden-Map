import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/LoginScreen';
import TermsScreen from './Login/TermsScreen';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TermsScreen navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}