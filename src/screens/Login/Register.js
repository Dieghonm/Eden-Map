import React, { useState, useContext } from 'react';
import { View, Platform, Alert, ActivityIndicator, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/Register';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import TextInput from '../../components/TextInput';
import InfoCard from '../../components/InfoCard';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { api, tokenHelpers } from '../../services/api';
import { spacing } from '../../theme/texts';

export default function Register({ navigation, onChangeScreen }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);
  
  const [showInfo, setShowInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const userRules = [' •  entre 4 - 20 caracteres'];
  const passwordRules = [
    ' •  entre 8 - 32 caracteres',
    ' •  use letras maiúsculas e minúsculas, números, sem espaçamentos'
  ];

  const validateUsername = (username) => {
    return username.length >= 4 && username.length <= 20;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8 && password.length <= 32;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && noSpaces;
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const userData = {
        login: formData.username.toLowerCase().trim(),
        senha: formData.password,
        email: formData.email.toLowerCase().trim(),
        tag: 'cliente',
        plan: 'trial'
      };

      console.log(userData,'data');
      const response = await api.cadastro(userData);
      console.log(response, 'resp');
      

      if (response.access_token) {
        await tokenHelpers.save(response.access_token);
      }

      // Salva no Provider (que salva automaticamente no storage)
      await setUser({
        login: response.user.login,
        email: formData.email,
        tag: userData.tag,
        plan: userData.plan,
        token_duration: response.token_duration,
        expires: response.expires,
      });

      navigation.replace('Home');
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);

      let errorMsg = 'Erro ao criar conta. Tente novamente.';
      if (error.status === 400) {
        if (error.message.includes('Email')) {
          errorMsg = 'Email já está cadastrado.';
        } else if (error.message.includes('Login')) {
          errorMsg = 'Nome de usuário já cadastrado.';
        } else {
          errorMsg = error.message;
        }
      } else if (error.status === 429) {
        errorMsg = 'Muitas tentativas. Aguarde um momento e tente novamente.';
      } else if (error.status === 0) {
        errorMsg = 'Erro de conexão. Verifique sua internet e se o servidor está rodando.';
      }

      setErrorMessage(errorMsg);
      Alert.alert('Erro no Cadastro', errorMsg);

    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    onChangeScreen('SIGNIN');
  };

  const isFormValid = 
    validateUsername(formData.username) && 
    validateEmail(formData.email) && 
    validatePassword(formData.password);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xs }
      ]}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xxxl / 2}
      keyboardOpeningTime={0}
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
          placeholder='Nome de Usuário'
          value={formData.username}
          onChangeText={(text) => {
            setFormData({ ...formData, username: text });
            if (!touched.username && text.length > 0) {
              setTouched({ ...touched, username: true });
            }
            setErrorMessage('');
          }}
          isValid={validateUsername(formData.username)}
          showValidation={touched.username}
          disabled={loading}
        />

        <TextInput
          placeholder='E-mail'
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            if (!touched.email && text.length > 0) {
              setTouched({ ...touched, email: true });
            }
            setErrorMessage('');
          }}
          isValid={validateEmail(formData.email)}
          showValidation={touched.email}
          disabled={loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder='Senha'
          value={formData.password}
          onChangeText={(text) => {
            setFormData({ ...formData, password: text });
            if (!touched.password && text.length > 0) {
              setTouched({ ...touched, password: true });
            }
            setErrorMessage('');
          }}
          secureTextEntry={true}
          showPasswordToggle={true}
          isValid={validatePassword(formData.password)}
          showValidation={touched.password}
          disabled={loading}
        />

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Image style={styles.errorImg} source={require('../../../assets/icons/Exclamation.png')} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : <View style={styles.space} />}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Criando sua conta...</Text>
          </View>
        ) : (
          <ButtonPrimary
            title='Criar minha conta'
            onPress={handleRegister}
            disabled={!isFormValid}
            width={220}
          />
        )}
      </GlassBox>
    </KeyboardAwareScrollView>
  );
}