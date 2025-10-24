
//   // leva para a home
//   // const { setUser } = useContext (AppContext);
//   // const handleAccept = () => {
//   //   if (bothAccepted) {
//   //     setUser({ name: 'Usuário', acceptedTerms: true });
//   //     navigation.replace('Home');
//   //   }
//   // };



import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
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

  const userRules = [
    ' •  entre 4 - 20 caracteres'
  ];

  const passwordRules = [
    ' •  entre 8 - 32 caracteres',
    ' •  use letras maiúsculas e minúsculas, números, sem espaçamentos'
  ];

  const handleRegister = () => {
    // Validação básica
    if (formData.username.length >= 4 && 
        formData.email.includes('@') && 
        formData.password.length >= 8) {
      // Aqui você implementaria a lógica de registro
      navigation.replace('Home');
    }
  };

  const isFormValid = 
    formData.username.length >= 4 && 
    formData.email.includes('@') && 
    formData.password.length >= 8;

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <GlassBox>
        {showInfo && (
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
        )}
      </GlassBox>
      <Logo style={styles.Logo}/>
      
      <WelcomeText 
        title='Inscreva-se'
      />

      <GlassBox style={styles.inputsContainer}>

          <TextInput
            placeholder='Nome'
            value={formData.username}
            onChangeText={(text) => setFormData({...formData, username: text})}
          />

          <TextInput
            placeholder='E-mail'
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />

          <TextInput
            placeholder='Senha'
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={true}
            showPasswordToggle={true}
          />

        <ButtonPrimary
          title='Criar minha conta'
          onPress={handleRegister}
          disabled={!isFormValid}
        />
      </GlassBox>
    </ScrollView>
  );
}