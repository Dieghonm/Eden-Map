import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/LoginScreen';
import TermsScreen from './Login/TermsScreen';
import Img from '../components/Img';
import Register from './Login/Register';
import SignIn from './Login/SignIn';
import ForgotPassword from './Login/ForgotPassword';
import { LOGINGIF } from '../../assets/json/Imagens';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentScreen, setCurrentScreen] = useState('TERMS');
  // const [currentScreen, setCurrentScreen] = useState('FORGOT_PASSWORD');

  const handleScreenChange = (newScreen) => {
    setCurrentScreen(newScreen);
  };

  const renderCurrentScreen = () => {
    const screenComponents = {
      'TERMS': <TermsScreen onChangeScreen={handleScreenChange} />,
      'REGISTER': <Register onChangeScreen={handleScreenChange} navigation={navigation}/>,
      'SIGNIN': <SignIn onChangeScreen={handleScreenChange} navigation={navigation}/>,
      'FORGOT_PASSWORD': <ForgotPassword onChangeScreen={handleScreenChange} />,
    };

    return screenComponents[currentScreen] || screenComponents.TERMS;
  };

  const screensWithoutGif = ['REGISTER', 'CHANGEPASSWORD', 'PLANS'];
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {!screensWithoutGif.includes(currentScreen) && (
        <View style={styles.content}>
          <Img
            source={{ uri: LOGINGIF }} 
            size={220}
          />
        </View>
      )}
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}