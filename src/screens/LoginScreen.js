import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/LoginScreen';
import TermsScreen from './Login/TermsScreen';
import Img from '../components/Img';
import Register from './Login/Register';
import SignIn from './Login/SignIn';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentScreen, setCurrentScreen] = useState('TERMS');
  // const [currentScreen, setCurrentScreen] = useState('REGISTER');

  const handleScreenChange = (newScreen) => {
    console.log('Switching to screen:', newScreen);
    setCurrentScreen(newScreen);
  };

  const renderCurrentScreen = () => {
    const screenComponents = {
      'TERMS': <TermsScreen onChangeScreen={handleScreenChange} />,
      'REGISTER': <Register onChangeScreen={handleScreenChange} navigation={navigation}/>,
      'SIGNIN': <SignIn onChangeScreen={handleScreenChange} navigation={navigation}/>,
    };

    return screenComponents[currentScreen] || screenComponents.TERMS;
  };

  const screensWithoutGif = ['REGISTER', 'CHANGEPASSWORD', 'PLANS'];
  return (
    <SafeAreaView style={styles.container}>
      {!screensWithoutGif.includes(currentScreen) && (
        <View style={styles.content}>
          <Img
          source={require('../../assets/42.png')}
          size={220}
          />
        </View>
      )}
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}