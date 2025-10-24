import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Login/TermsScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import Checkbox from '../../components/Checkbox';

export default function TermsScreen({ onChangeScreen }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const bothAccepted = acceptedTerms && acceptedPrivacy;

  const handleNavigate = (screen) => {
    if (bothAccepted) {
      onChangeScreen(screen);
    }
  };

  return (
    <View style={styles.card}>
      <Logo />
      
      <WelcomeText 
        title='Bem-Vindo ao Eden Map'
        subtitle='Encontre o paraíso dentro de você!'
      />
      
      <Checkbox 
        checked={acceptedTerms}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
        textPrefix="Eu concordo com os"
        textLink="Termos e Condições"
      />
      
      <Checkbox 
        checked={acceptedPrivacy}
        onPress={() => setAcceptedPrivacy(!acceptedPrivacy)}
        textPrefix="Eu concordo com a"
        textLink="Política de Privacidade"
      />

      <ButtonPrimary
        title="Criar minha conta"
        onPress={() => handleNavigate('REGISTER')}
        disabled={!bothAccepted}
      />

      <ButtonSecundary
        title="Login"
        onPress={() => handleNavigate('SIGNIN')}
        disabled={!bothAccepted}
      />
    </View>
  );
}