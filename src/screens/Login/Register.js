import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Login/Register';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import TextInput from '../../components/TextInput';
import InfoCard from '../../components/InfoCard';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function Register({ navigation, onChangeScreen }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [showInfo, setShowInfo] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const userRules = [' •  entre 4 - 20 caracteres'];
  const passwordRules = [
    ' •  entre 8 - 32 caracteres',
    ' •  use letras maiúsculas e minúsculas, números, sem espaçamentos'
  ];

  const handleRegister = () => {
    if (
      formData.username.length >= 4 && 
      formData.email.includes('@') && 
      formData.password.length >= 8
    ) {
      navigation.replace('Home');
    }
  };

  const handleGoToLogin = () => {
    onChangeScreen('SIGNIN');
  };

  const isFormValid = 
    formData.username.length >= 4 && 
    formData.email.includes('@') && 
    formData.password.length >= 8;

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }
      ]}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}    // espaço extra quando o teclado abrir
      keyboardOpeningTime={0}                                 // melhora a resposta em alguns dispositivos
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {showInfo && (
        <GlassBox style={styles.infoCardContainer}>
          <InfoCard
            title='Regras usuário e senha'
            items={[
              'Usuário:',
              ...userRules,
              'Senha:',
              ...passwordRules,
            ]}
            onClose={() => setShowInfo(false)}
          />
          <View style={styles.space} />
        </GlassBox>
      )}
      
      <View>
        <Logo />
      </View>
      
      <WelcomeText 
        title='Inscreva-se'
        subtitle='Já possui uma conta? Faça login'
        linkText='Faça login'
        onLinkPress={handleGoToLogin}
      />

      <GlassBox>
        <TextInput
          placeholder='Nome'
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          // se seu TextInput custom aceitar, passe também onFocus/onBlur
        />

        <TextInput
          placeholder='E-mail'
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          placeholder='Senha'
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={true}
          showPasswordToggle={true}
          style={styles.button}
        />

        <View style={styles.space} />

        <ButtonPrimary
          title='Criar minha conta'
          onPress={handleRegister}
          disabled={!isFormValid}
          width={220}
        />
      </GlassBox>
    </KeyboardAwareScrollView>
  );
}




//   // leva para a home
//   // const { setUser } = useContext (AppContext);
//   // const handleAccept = () => {
//   //   if (bothAccepted) {
//   //     setUser({ name: 'Usuário', acceptedTerms: true });
//   //     navigation.replace('Home');
//   //   }
//   // };
